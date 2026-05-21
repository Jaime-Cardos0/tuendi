"use client";

import {
  Box, Flex, Stack, Text, HStack, Button, Tag, TagLabel,
  TagLeftIcon, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  Divider, Avatar, Spinner, Center, Textarea, Badge,
  SimpleGrid, Input, InputGroup, InputLeftElement, Select,
} from "@chakra-ui/react";
import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { ISuporte, SuporteStatus, IUser } from "@/services/mirage/types";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiCircleFill, RiSearchLine, RiSendPlane2Line } from "react-icons/ri";

const statusColor: Record<SuporteStatus, string> = {
  aberto:     "red",
  em_analise: "yellow",
  resolvido:  "green",
};

const statusLabel: Record<SuporteStatus, string> = {
  aberto:     "Aberto",
  em_analise: "Em análise",
  resolvido:  "Resolvido",
};

interface SuporteComUser extends ISuporte {
  user: IUser;
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<SuporteComUser[]>([]);
  const [selected, setSelected] = useState<SuporteComUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [resposta, setResposta] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SuporteStatus | "TODOS">("TODOS");

  useEffect(() => {
    api.get("/suportes")
      .then((res) => {
        setTickets(res.data);
        setSelected(res.data[0] ?? null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function responderTicket(id: string) {
    if (!resposta.trim()) return;
    await api.patch(`/suportes/${id}`, {
      resposta,
      status: "resolvido" as SuporteStatus,
      resolvidoEm: new Date().toISOString(),
    });
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, resposta, status: "resolvido" } : t
      )
    );
    setSelected((prev) =>
      prev?.id === id ? { ...prev, resposta, status: "resolvido" } : prev
    );
    setResposta("");
  }

  async function updateStatus(id: string, status: SuporteStatus) {
    await api.patch(`/suportes/${id}`, { status });
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    setSelected((prev) =>
      prev?.id === id ? { ...prev, status } : prev
    );
  }

  const abertos    = useMemo(() => tickets.filter((t) => t.status === "aberto").length, [tickets]);
  const emAnalise  = useMemo(() => tickets.filter((t) => t.status === "em_analise").length, [tickets]);
  const resolvidos = useMemo(() => tickets.filter((t) => t.status === "resolvido").length, [tickets]);

  const filtered = useMemo(() => {
    let result = [...tickets];

    if (statusFilter !== "TODOS")
      result = result.filter((t) => t.status === statusFilter);

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((t) =>
        t.titulo.toLowerCase().includes(term) ||
        t.descricao.toLowerCase().includes(term)
      );
    }

    return result.sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );
  }, [tickets, statusFilter, search]);

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
            <Text lineHeight="1" fontSize="3xl" fontWeight="thin" color="text.primary">
              Suporte
            </Text>
            <Breadcrumb spacing="8px" separator={<MdOutlineKeyboardDoubleArrowRight color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink fontSize="xs" color="text.primary" textTransform="uppercase" href="#">
                  Support Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink fontSize="xs" href="/admin/support">Suporte</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>

          {/* Métricas */}
          <SimpleGrid columns={3} gap={4}>
            <Box bg="bg.card" border="1px solid" borderColor="border.default" rounded="lg" p={4}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="text.secondary">Abertos</Text>
                <Box w={2} h={2} rounded="full" bg="red.400" />
              </HStack>
              <Text fontSize="3xl" fontWeight="bold" mt={1}>{abertos}</Text>
            </Box>
            <Box bg="bg.card" border="1px solid" borderColor="border.default" rounded="lg" p={4}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="text.secondary">Em análise</Text>
                <Box w={2} h={2} rounded="full" bg="yellow.400" />
              </HStack>
              <Text fontSize="3xl" fontWeight="bold" mt={1}>{emAnalise}</Text>
            </Box>
            <Box bg="bg.card" border="1px solid" borderColor="border.default" rounded="lg" p={4}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="text.secondary">Resolvidos</Text>
                <Box w={2} h={2} rounded="full" bg="green.400" />
              </HStack>
              <Text fontSize="3xl" fontWeight="bold" mt={1}>{resolvidos}</Text>
            </Box>
          </SimpleGrid>

          {/* Layout inbox */}
          <Flex gap={4} h="calc(100vh - 380px)" minH="500px">

            {/* Lista de tickets */}
            <Box
              w="340px"
              flexShrink={0}
              bg="bg.card"
              border="1px solid"
              borderColor="border.default"
              rounded="lg"
              display="flex"
              flexDirection="column"
              overflow="hidden"
            >
              {/* Filtros */}
              <Box p={3} borderBottom="1px solid" borderColor="border.default">
                <Stack gap={2}>
                  <InputGroup size="sm">
                    <InputLeftElement pointerEvents="none">
                      <RiSearchLine color="gray" />
                    </InputLeftElement>
                    <Input
                      placeholder="Pesquisar ticket..."
                      bg="navy.600"
                      rounded="md"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InputGroup>
                  <Select
                    size="sm" rounded="md" bg="navy.600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as SuporteStatus | "TODOS")}
                  >
                    <option value="TODOS">Todos</option>
                    <option value="aberto">Abertos</option>
                    <option value="em_analise">Em análise</option>
                    <option value="resolvido">Resolvidos</option>
                  </Select>
                </Stack>
              </Box>

              {/* Lista */}
              <Box overflowY="auto" flex={1}>
                {filtered.length === 0 ? (
                  <Center h="100%" py={8}>
                    <Text fontSize="sm" color="text.muted">Nenhum ticket encontrado.</Text>
                  </Center>
                ) : (
                  filtered.map((t) => (
                    <Box
                      key={t.id}
                      p={4}
                      cursor="pointer"
                      borderBottom="1px solid"
                      borderColor="border.default"
                      bg={selected?.id === t.id ? "navy.600" : "transparent"}
                      borderLeft="3px solid"
                      borderLeftColor={selected?.id === t.id ? "brand.500" : "transparent"}
                      _hover={{ bg: "navy.600" }}
                      transition="all 0.15s"
                      onClick={() => setSelected(t)}
                    >
                      <Flex justify="space-between" align="flex-start" mb={1}>
                        <Text
                          fontSize="sm"
                          fontWeight={t.status === "aberto" ? "bold" : "normal"}
                          noOfLines={1}
                          flex={1}
                          mr={2}
                        >
                          {t.titulo}
                        </Text>
                        <Tag colorScheme={statusColor[t.status]} size="sm" flexShrink={0}>
                          <TagLeftIcon as={RiCircleFill} />
                          <TagLabel>{statusLabel[t.status]}</TagLabel>
                        </Tag>
                      </Flex>
                      <Text fontSize="xs" color="text.secondary" noOfLines={2} mb={2}>
                        {t.descricao}
                      </Text>
                      <Text fontSize="xs" color="text.muted">
                        {new Date(t.criadoEm).toLocaleDateString("pt-AO")}
                      </Text>
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            {/* Painel de detalhe */}
            {selected ? (
              <Box
                flex={1}
                bg="bg.card"
                border="1px solid"
                borderColor="border.default"
                rounded="lg"
                display="flex"
                flexDirection="column"
                overflow="hidden"
              >
                {/* Header do ticket */}
                <Box p={5} borderBottom="1px solid" borderColor="border.default">
                  <Flex justify="space-between" align="flex-start">
                    <Box flex={1} mr={4}>
                      <Text fontSize="lg" fontWeight="bold" mb={1}>
                        {selected.titulo}
                      </Text>
                      <HStack gap={2}>
                        <Tag colorScheme={statusColor[selected.status]} size="sm">
                          <TagLeftIcon as={RiCircleFill} />
                          <TagLabel>{statusLabel[selected.status]}</TagLabel>
                        </Tag>
                        <Text fontSize="xs" color="text.muted">
                          {new Date(selected.criadoEm).toLocaleDateString("pt-AO")}
                        </Text>
                        {selected.resolvidoEm && (
                          <Text fontSize="xs" color="green.400">
                            Resolvido em {new Date(selected.resolvidoEm).toLocaleDateString("pt-AO")}
                          </Text>
                        )}
                      </HStack>
                    </Box>

                    {/* Acções de status */}
                    <HStack gap={2}>
                      {selected.status !== "em_analise" && selected.status !== "resolvido" && (
                        <Button
                          size="sm"
                          variant="outline"
                          colorScheme="yellow"
                          onClick={() => updateStatus(selected.id, "em_analise")}
                        >
                          Analisar
                        </Button>
                      )}
                      {selected.status !== "resolvido" && (
                        <Button
                          size="sm"
                          colorScheme="green"
                          variant="outline"
                          onClick={() => updateStatus(selected.id, "resolvido")}
                        >
                          Resolver
                        </Button>
                      )}
                    </HStack>
                  </Flex>
                </Box>

                {/* Corpo */}
                <Box flex={1} overflowY="auto" p={5}>
                  <Stack gap={5}>

                    {/* Utilizador */}
                    <Box
                      bg="navy.600"
                      rounded="lg"
                      p={4}
                      border="1px solid"
                      borderColor="border.default"
                    >
                      <Text fontSize="xs" color="text.muted" mb={3} textTransform="uppercase" letterSpacing="wide">
                        Enviado por
                      </Text>
                      <HStack gap={3}>
                        <Avatar
                          size="sm"
                          src={selected.user?.fotoPerfil}
                          name={`${selected.user?.nome} ${selected.user?.sobrenome}`}
                        />
                        <Box>
                          <Text fontSize="sm" fontWeight="medium">
                            {selected.user?.nome} {selected.user?.sobrenome}
                          </Text>
                          <Text fontSize="xs" color="text.secondary">
                            {selected.user?.email}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>

                    {/* Descrição */}
                    <Box>
                      <Text fontSize="xs" color="text.muted" mb={2} textTransform="uppercase" letterSpacing="wide">
                        Descrição
                      </Text>
                      <Box
                        bg="navy.600"
                        rounded="lg"
                        p={4}
                        border="1px solid"
                        borderColor="border.default"
                      >
                        <Text fontSize="sm" lineHeight="relaxed">
                          {selected.descricao}
                        </Text>
                      </Box>
                    </Box>

                    {/* Resposta existente */}
                    {selected.resposta && (
                      <Box>
                        <HStack mb={2}>
                          <Text fontSize="xs" color="text.muted" textTransform="uppercase" letterSpacing="wide">
                            Resposta do admin
                          </Text>
                          <Badge colorScheme="green" fontSize="xs">Respondido</Badge>
                        </HStack>
                        <Box
                          bg="navy.700"
                          rounded="lg"
                          p={4}
                          border="1px solid"
                          borderColor="green.800"
                        >
                          <Text fontSize="sm" lineHeight="relaxed">
                            {selected.resposta}
                          </Text>
                        </Box>
                      </Box>
                    )}

                  </Stack>
                </Box>

                {/* Campo de resposta */}
                {selected.status !== "resolvido" && (
                  <Box p={4} borderTop="1px solid" borderColor="border.default">
                    <Flex gap={3} align="flex-end">
                      <Textarea
                        flex={1}
                        placeholder="Escreve a tua resposta..."
                        bg="navy.600"
                        border="1px solid"
                        borderColor="border.default"
                        rounded="lg"
                        size="sm"
                        resize="none"
                        rows={3}
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                        _focus={{
                          borderColor: "brand.500",
                          boxShadow: "0 0 0 1px #C026D3",
                        }}
                      />
                      <Button
                        colorScheme="purple"
                        size="sm"
                        leftIcon={<RiSendPlane2Line />}
                        isDisabled={!resposta.trim()}
                        onClick={() => responderTicket(selected.id)}
                        alignSelf="flex-end"
                      >
                        Enviar
                      </Button>
                    </Flex>
                  </Box>
                )}

              </Box>
            ) : (
              <Center
                flex={1}
                bg="bg.card"
                border="1px solid"
                borderColor="border.default"
                rounded="lg"
              >
                <Text color="text.muted" fontSize="sm">
                  Selecciona um ticket para ver os detalhes.
                </Text>
              </Center>
            )}

          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}