"use client";

import {
  Box, Flex, Stack, Text, HStack, Button, Tag, TagLabel,
  TagLeftIcon, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  Avatar, SimpleGrid, Spinner, Center, Badge, Divider,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, useDisclosure, Textarea,
  Image, Input, InputGroup, InputLeftElement, Select,
} from "@chakra-ui/react";
import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { ISubscricao, UploadStatus } from "@/services/mirage/types";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiCircleFill, RiSearchLine, RiCheckLine, RiCloseLine, RiDownloadLine } from "react-icons/ri";

// Estende ISubscricao com o comprovativo montado
interface ISubscricaoComComprovativo extends ISubscricao {
  comprovativo: {
    id: string;
    url: string;
    status: UploadStatus;
    motivoRejeicao: string | null;
    criadoEm: string;
  } | null;
}

const statusColor: Record<UploadStatus, string> = {
  pendente:  "yellow",
  aprovado:  "green",
  rejeitado: "red",
};

const statusLabel: Record<UploadStatus, string> = {
  pendente:  "Pendente",
  aprovado:  "Aprovado",
  rejeitado: "Rejeitado",
};

const planoColor: Record<string, string> = {
  semanal: "purple",
  mensal:  "blue",
};

export default function PayoutsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subscricoes, setSubscricoes] = useState<ISubscricaoComComprovativo[]>([]);
  const [selected, setSelected] = useState<ISubscricaoComComprovativo | null>(null);
  const [loading, setLoading] = useState(true);
  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UploadStatus | "TODOS">("TODOS");
  const [planoFilter, setPlanoFilter] = useState<"TODOS" | "semanal" | "mensal">("TODOS");

  useEffect(() => {
    api.get("/subscricoes")
      .then((res) => setSubscricoes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function openModal(s: ISubscricaoComComprovativo) {
    setSelected(s);
    setMotivoRejeicao("");
    onOpen();
  }

  async function aprovarComprovativo(subscricaoId: string, uploadId: string) {
    await api.patch(`/uploads/${uploadId}`, { status: "aprovado", motivoRejeicao: null });
    await api.patch(`/subscricoes/${subscricaoId}`, { status: "activa" });
    setSubscricoes((prev) =>
      prev.map((s) =>
        s.id === subscricaoId
          ? { ...s, status: "activa", comprovativo: s.comprovativo ? { ...s.comprovativo, status: "aprovado" } : null }
          : s
      )
    );
    setSelected((prev) =>
      prev?.id === subscricaoId
        ? { ...prev, status: "activa", comprovativo: prev.comprovativo ? { ...prev.comprovativo, status: "aprovado" } : null }
        : prev
    );
    onClose();
  }

  async function rejeitarComprovativo(subscricaoId: string, uploadId: string) {
    if (!motivoRejeicao.trim()) return;
    await api.patch(`/uploads/${uploadId}`, { status: "rejeitado", motivoRejeicao });
    await api.patch(`/subscricoes/${subscricaoId}`, { status: "cancelada" });
    setSubscricoes((prev) =>
      prev.map((s) =>
        s.id === subscricaoId
          ? {
              ...s,
              status: "cancelada",
              comprovativo: s.comprovativo
                ? { ...s.comprovativo, status: "rejeitado", motivoRejeicao }
                : null,
            }
          : s
      )
    );
    setSelected((prev) =>
      prev?.id === subscricaoId
        ? {
            ...prev,
            status: "cancelada",
            comprovativo: prev.comprovativo
              ? { ...prev.comprovativo, status: "rejeitado", motivoRejeicao }
              : null,
          }
        : prev
    );
    onClose();
  }

  // Métricas
  const pendentes  = useMemo(() => subscricoes.filter((s) => s.comprovativo?.status === "pendente").length, [subscricoes]);
  const aprovados  = useMemo(() => subscricoes.filter((s) => s.comprovativo?.status === "aprovado").length, [subscricoes]);
  const rejeitados = useMemo(() => subscricoes.filter((s) => s.comprovativo?.status === "rejeitado").length, [subscricoes]);

  const filtered = useMemo(() => {
    let result = [...subscricoes];

    if (statusFilter !== "TODOS")
      result = result.filter((s) => s.comprovativo?.status === statusFilter);

    if (planoFilter !== "TODOS")
      result = result.filter((s) => s.plano === planoFilter);

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((s) =>
        `${s.motoqueiro.user.nome} ${s.motoqueiro.user.sobrenome}`.toLowerCase().includes(term) ||
        s.motoqueiro.user.email.toLowerCase().includes(term)
      );
    }

    return result.sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );
  }, [subscricoes, statusFilter, planoFilter, search]);

  if (loading) return (
    <Center h="100vh"><Spinner size="xl" /></Center>
  );

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" maxW="1440px" my={6} mx="auto" px={8}>
        <Sidebar />

        <Box as="main" w="100%" ml={52} mt={20} display="flex" flexDirection="column" gap={6}>

          {/* Breadcrumb */}
          <Stack alignSelf="flex-start">
            <Text lineHeight={1} fontSize="3xl" fontWeight="thin" color="text.primary">
              Comprovativos
            </Text>
            <Breadcrumb spacing="8px" separator={<MdOutlineKeyboardDoubleArrowRight color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink fontSize="xs" color="text.primary" textTransform="uppercase" href="#">
                  Main Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink fontSize="xs" href="/admin/earnings">Ganhos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink fontSize="xs" href="/admin/earnings/payouts">Comprovativos</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>

          {/* Métricas */}
          <SimpleGrid columns={3} gap={4}>
            <Box bg="bg.card" border="1px solid" borderColor="border.default" rounded="lg" p={4}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="text.secondary">Pendentes</Text>
                <Box w={2} h={2} rounded="full" bg="yellow.400" />
              </HStack>
              <Text fontSize="3xl" fontWeight="bold" mt={1}>{pendentes}</Text>
            </Box>
            <Box bg="bg.card" border="1px solid" borderColor="border.default" rounded="lg" p={4}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="text.secondary">Aprovados</Text>
                <Box w={2} h={2} rounded="full" bg="green.400" />
              </HStack>
              <Text fontSize="3xl" fontWeight="bold" mt={1}>{aprovados}</Text>
            </Box>
            <Box bg="bg.card" border="1px solid" borderColor="border.default" rounded="lg" p={4}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="text.secondary">Rejeitados</Text>
                <Box w={2} h={2} rounded="full" bg="red.400" />
              </HStack>
              <Text fontSize="3xl" fontWeight="bold" mt={1}>{rejeitados}</Text>
            </Box>
          </SimpleGrid>

          {/* Filtros e lista */}
          <Box bg="bg.card" border="1px solid" borderColor="border.default" rounded="lg" p={6}>
            <Stack gap={4}>
              <Text fontWeight="semibold" fontSize="lg">Comprovativos de Pagamento</Text>

              <Flex justify="space-between" align="center" gap={4} wrap="wrap">
                <InputGroup maxW="280px" size="sm">
                  <InputLeftElement pointerEvents="none">
                    <RiSearchLine color="gray" />
                  </InputLeftElement>
                  <Input
                    placeholder="Pesquisar por nome ou email..."
                    bg="navy.600"
                    rounded="md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>

                <HStack gap={3}>
                  <Select
                    size="sm" rounded="md" bg="navy.600" w="fit-content"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as UploadStatus | "TODOS")}
                  >
                    <option value="TODOS">Todos os status</option>
                    <option value="pendente">Pendentes</option>
                    <option value="aprovado">Aprovados</option>
                    <option value="rejeitado">Rejeitados</option>
                  </Select>

                  <Select
                    size="sm" rounded="md" bg="navy.600" w="fit-content"
                    value={planoFilter}
                    onChange={(e) => setPlanoFilter(e.target.value as typeof planoFilter)}
                  >
                    <option value="TODOS">Todos os planos</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                  </Select>
                </HStack>
              </Flex>
            </Stack>

            <Stack gap={3} mt={4}>
              {filtered.length === 0 ? (
                <Center py={12}>
                  <Text fontSize="sm" color="text.muted">Nenhum comprovativo encontrado.</Text>
                </Center>
              ) : (
                filtered.map((s) => (
                  <Flex
                    key={s.id}
                    justify="space-between"
                    align="center"
                    p={4}
                    bg="navy.600"
                    rounded="lg"
                    border="1px solid"
                    borderColor="border.default"
                    _hover={{ borderColor: "border.subtle" }}
                    transition="all 0.15s"
                    cursor="pointer"
                    onClick={() => openModal(s)}
                  >
                    {/* Motoqueiro */}
                    <HStack gap={3} flex={1}>
                      <Avatar
                        size="sm"
                        src={s.motoqueiro.user.fotoPerfil}
                        name={`${s.motoqueiro.user.nome} ${s.motoqueiro.user.sobrenome}`}
                      />
                      <Box>
                        <Text fontSize="sm" fontWeight="medium">
                          {s.motoqueiro.user.nome} {s.motoqueiro.user.sobrenome}
                        </Text>
                        <Text fontSize="xs" color="text.secondary">
                          {s.motoqueiro.user.email}
                        </Text>
                      </Box>
                    </HStack>

                    {/* Plano e valor */}
                    <HStack gap={6} mx={6}>
                      <Box textAlign="center">
                        <Text fontSize="xs" color="text.muted" mb={1}>Plano</Text>
                        <Tag colorScheme={planoColor[s.plano]} size="sm">
                          <TagLabel textTransform="capitalize">{s.plano}</TagLabel>
                        </Tag>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="xs" color="text.muted" mb={1}>Valor</Text>
                        <Text fontSize="sm" fontWeight="bold" color="cyan.400">
                          {s.valor.toLocaleString("pt-AO")} Kz
                        </Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="xs" color="text.muted" mb={1}>Data</Text>
                        <Text fontSize="xs">
                          {new Date(s.criadoEm).toLocaleDateString("pt-AO")}
                        </Text>
                      </Box>
                    </HStack>

                    {/* Status do comprovativo */}
                    {s.comprovativo ? (
                      <Tag colorScheme={statusColor[s.comprovativo.status]} size="sm">
                        <TagLeftIcon as={RiCircleFill} />
                        <TagLabel>{statusLabel[s.comprovativo.status]}</TagLabel>
                      </Tag>
                    ) : (
                      <Badge colorScheme="gray">Sem comprovativo</Badge>
                    )}
                  </Flex>
                ))
              )}
            </Stack>
          </Box>

        </Box>
      </Flex>

      {/* Modal de detalhe */}
      {selected && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg="bg.card" border="1px solid" borderColor="border.default">
            <ModalHeader>
              <HStack justify="space-between">
                <Text>Comprovativo de Pagamento</Text>
                {selected.comprovativo && (
                  <Tag colorScheme={statusColor[selected.comprovativo.status]} size="sm">
                    <TagLeftIcon as={RiCircleFill} />
                    <TagLabel>{statusLabel[selected.comprovativo.status]}</TagLabel>
                  </Tag>
                )}
              </HStack>
            </ModalHeader>

            <ModalBody display="flex" flexDirection="column" gap={5}>

              {/* Info do motoqueiro */}
              <Box bg="navy.600" rounded="lg" p={4} border="1px solid" borderColor="border.default">
                <Text fontSize="xs" color="text.muted" mb={3} textTransform="uppercase" letterSpacing="wide">
                  Motoqueiro
                </Text>
                <Flex justify="space-between" align="center">
                  <HStack gap={3}>
                    <Avatar
                      size="md"
                      src={selected.motoqueiro.user.fotoPerfil}
                      name={`${selected.motoqueiro.user.nome} ${selected.motoqueiro.user.sobrenome}`}
                    />
                    <Box>
                      <Text fontWeight="medium">
                        {selected.motoqueiro.user.nome} {selected.motoqueiro.user.sobrenome}
                      </Text>
                      <Text fontSize="sm" color="text.secondary">{selected.motoqueiro.user.email}</Text>
                      <Text fontSize="sm" color="text.secondary">{selected.motoqueiro.user.telefone}</Text>
                    </Box>
                  </HStack>
                  <Box textAlign="right">
                    <Tag colorScheme={planoColor[selected.plano]} size="sm" mb={2}>
                      <TagLabel textTransform="capitalize">Plano {selected.plano}</TagLabel>
                    </Tag>
                    <Text fontSize="xl" fontWeight="bold" color="cyan.400">
                      {selected.valor.toLocaleString("pt-AO")} Kz
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Divider borderColor="border.default" />

              {/* Comprovativo */}
              {selected.comprovativo ? (
                <Box>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontSize="xs" color="text.muted" textTransform="uppercase" letterSpacing="wide">
                      Comprovativo
                    </Text>
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="purple"
                      leftIcon={<RiDownloadLine />}
                      as="a"
                      href={selected.comprovativo.url}
                      target="_blank"
                    >
                      Abrir original
                    </Button>
                  </Flex>

                  <Box
                    rounded="lg"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="border.default"
                    bg="navy.600"
                  >
                    <Image
                      src={selected.comprovativo.url}
                      alt="Comprovativo de pagamento"
                      w="100%"
                      maxH="300px"
                      objectFit="contain"
                      fallbackSrc="https://via.placeholder.com/600x300?text=Comprovativo"
                    />
                  </Box>

                  <Text fontSize="xs" color="text.muted" mt={2}>
                    Submetido em {new Date(selected.comprovativo.criadoEm).toLocaleDateString("pt-AO")}
                  </Text>

                  {/* Motivo de rejeição existente */}
                  {selected.comprovativo.motivoRejeicao && (
                    <Box mt={3} p={3} bg="red.900" rounded="lg" border="1px solid" borderColor="red.700">
                      <Text fontSize="xs" color="red.300" mb={1} fontWeight="bold">
                        Motivo de rejeição
                      </Text>
                      <Text fontSize="sm" color="red.200">
                        {selected.comprovativo.motivoRejeicao}
                      </Text>
                    </Box>
                  )}
                </Box>
              ) : (
                <Center py={8}>
                  <Text fontSize="sm" color="text.muted">Nenhum comprovativo submetido.</Text>
                </Center>
              )}

              {/* Campo de motivo de rejeição */}
              {selected.comprovativo?.status === "pendente" && (
                <Box>
                  <Text fontSize="xs" color="text.muted" mb={2} textTransform="uppercase" letterSpacing="wide">
                    Motivo de rejeição (obrigatório para rejeitar)
                  </Text>
                  <Textarea
                    placeholder="Ex: Comprovativo ilegível, valor incorrecto..."
                    bg="navy.600"
                    border="1px solid"
                    borderColor="border.default"
                    rounded="lg"
                    size="sm"
                    resize="none"
                    rows={3}
                    value={motivoRejeicao}
                    onChange={(e) => setMotivoRejeicao(e.target.value)}
                    _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #C026D3" }}
                  />
                </Box>
              )}

            </ModalBody>

            <ModalFooter gap={3}>
              <Button size="sm" variant="ghost" onClick={onClose}>Fechar</Button>

              {selected.comprovativo?.status === "pendente" && (
                <>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<RiCloseLine />}
                    isDisabled={!motivoRejeicao.trim()}
                    onClick={() => rejeitarComprovativo(selected.id, selected.comprovativo!.id)}
                  >
                    Rejeitar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="green"
                    leftIcon={<RiCheckLine />}
                    onClick={() => aprovarComprovativo(selected.id, selected.comprovativo!.id)}
                  >
                    Aprovar
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
}