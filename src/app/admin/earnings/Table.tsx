"use client";
import {
  Box, Tag, TagLeftIcon, TagLabel, IconButton,
  Flex, Stack, Select, Input, InputGroup,
  InputLeftElement, Avatar, Text, HStack,
  useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter, Button,
  SimpleGrid, Badge,
} from "@chakra-ui/react";
import { TableComponent } from "@/components/UI/Table/Table";
import { TableHeader } from "@/components/UI/Table/TableHeader";
import { Pagination } from "@/components/UI/Table/Pagination";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill, RiSearchLine } from "react-icons/ri";
import { useContext, useMemo, useState } from "react";
import { ISubscricao, PlanoTipo, SubscricaoStatus } from "@/services/mirage/types";
import { EarningsContext } from "@/contexts/EarningsContext";

const statusColor: Record<SubscricaoStatus, string> = {
  activa:    "cyan",
  expirada:  "gray",
  cancelada: "red",
};

const statusLabel: Record<SubscricaoStatus, string> = {
  activa:    "Activa",
  expirada:  "Expirada",
  cancelada: "Cancelada",
};

const planoColor: Record<PlanoTipo, string> = {
  semanal: "purple",
  mensal:  "blue",
};

interface Props {
  subscricoes: ISubscricao[];
}

export function EarningsTable() {

  const { subscricoes } = useContext(EarningsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<ISubscricao | null>(null);
  const [search, setSearch] = useState("");
  const [planoFilter, setPlanoFilter] = useState<PlanoTipo | "TODOS">("TODOS");
  const [statusFilter, setStatusFilter] = useState<SubscricaoStatus | "TODOS">("TODOS");
  const [sortBy, setSortBy] = useState<"recentes" | "valor">("recentes");

  function openModal(s: ISubscricao) {
    setSelected(s);
    onOpen();
  }

  const filtered = useMemo(() => {
    let result = [...subscricoes];

    if (planoFilter !== "TODOS")
      result = result.filter((s) => s.plano === planoFilter);

    if (statusFilter !== "TODOS")
      result = result.filter((s) => s.status === statusFilter);

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((s) =>
        `${s.motoqueiro.user.nome} ${s.motoqueiro.user.sobrenome}`.toLowerCase().includes(term) ||
        s.motoqueiro.user.email.toLowerCase().includes(term)
      );
    }

    if (sortBy === "valor") {
      result.sort((a, b) => b.valor - a.valor);
    } else {
      result.sort((a, b) =>
        new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      );
    }

    return result;
  }, [subscricoes, planoFilter, statusFilter, search, sortBy]);

  const columns = [
    {
      header: "Motoqueiro",
      render: (s: ISubscricao) => (
        <Flex align="center" gap={2}>
          <Avatar
            size="sm"
            src={s.motoqueiro.user.fotoPerfil}
            name={`${s.motoqueiro.user.nome} ${s.motoqueiro.user.sobrenome}`}
          />
          <Text>{s.motoqueiro.user.nome} {s.motoqueiro.user.sobrenome}</Text>
        </Flex>
      ),
    },
    {
      header: "Plano",
      render: (s: ISubscricao) => (
        <Tag colorScheme={planoColor[s.plano]} size="sm">
          <TagLabel textTransform="capitalize">{s.plano}</TagLabel>
        </Tag>
      ),
    },
    {
      header: "Valor",
      render: (s: ISubscricao) => (
        <Text fontWeight="bold" color="cyan.400">
          {s.valor.toLocaleString("pt-AO")} Kz
        </Text>
      ),
    },
    {
      header: "Status",
      render: (s: ISubscricao) => (
        <Tag colorScheme={statusColor[s.status]} size="sm">
          <TagLeftIcon as={RiCircleFill} color={`${statusColor[s.status]}.500`} />
          <TagLabel>{statusLabel[s.status]}</TagLabel>
        </Tag>
      ),
    },
    {
      header: "Início",
      render: (s: ISubscricao) => (
        <Text fontSize="sm">{new Date(s.inicioEm).toLocaleDateString("pt-AO")}</Text>
      ),
    },
    {
      header: "Expira",
      render: (s: ISubscricao) => (
        <Text fontSize="sm">{new Date(s.expiraEm).toLocaleDateString("pt-AO")}</Text>
      ),
    },
    {
      header: "",
      render: (s: ISubscricao) => (
        <IconButton
          variant="ghost"
          aria-label="Ver detalhes"
          icon={<BsThreeDots />}
          onClick={() => openModal(s)}
        />
      ),
    },
  ];

  return (
    <>
      <Box
        p={6} display="flex" gap={6} flexDirection="column" mb={8}
        bg="bg.card" border="2px" borderColor="border.default" rounded="lg"
      >
        <Stack gap={4}>
          <TableHeader title="Histórico de Subscrições" />

          <Flex justify="space-between" align="center" gap={4} wrap="wrap">
            <InputGroup maxW="280px" size="sm" bg={"navy.900"}>
              <InputLeftElement pointerEvents="none">
                <RiSearchLine color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Pesquisar por nome ou email..."
                rounded="md"
                bg={"navy.900"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            <Flex gap={3} wrap="wrap">
              <Select
                bg={"navy.900"}
                w="fit-content" size="sm" rounded="md"
                value={planoFilter}
                onChange={(e) => setPlanoFilter(e.target.value as PlanoTipo | "TODOS")}
              >
                <option value="TODOS">Todos os planos</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </Select>

              <Select
                bg={"navy.900"}
                w="fit-content" size="sm" rounded="md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as SubscricaoStatus | "TODOS")}
              >
                <option value="TODOS">Todos os status</option>
                <option value="activa">Activas</option>
                <option value="expirada">Expiradas</option>
                <option value="cancelada">Canceladas</option>
              </Select>

              <Select
                bg={"navy.900"}
                w="fit-content" size="sm" rounded="md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              >
                <option value="recentes">Mais recentes</option>
                <option value="valor">Maior valor</option>
              </Select>
            </Flex>
          </Flex>
        </Stack>

        <TableComponent data={filtered} columns={columns} />
        <Pagination />
      </Box>

      {/* Modal */}
      {selected && (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalOverlay />
          <ModalContent bg="grayDark.700">
            <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
              <Text>Detalhes da Subscrição</Text>
              <HStack>
                <Tag colorScheme={planoColor[selected.plano]} size="sm">
                  <TagLabel textTransform="capitalize">{selected.plano}</TagLabel>
                </Tag>
                <Tag colorScheme={statusColor[selected.status]} size="sm">
                  <TagLeftIcon as={RiCircleFill} />
                  <TagLabel>{statusLabel[selected.status]}</TagLabel>
                </Tag>
              </HStack>
            </ModalHeader>

            <ModalBody display="flex" flexDirection="column" gap={4}>

              {/* Motoqueiro */}
              <Flex align="center" gap={3}>
                <Avatar
                  size="md"
                  src={selected.motoqueiro.user.fotoPerfil}
                  name={`${selected.motoqueiro.user.nome} ${selected.motoqueiro.user.sobrenome}`}
                />
                <Box>
                  <Text fontWeight="bold">
                    {selected.motoqueiro.user.nome} {selected.motoqueiro.user.sobrenome}
                  </Text>
                  <Text fontSize="sm" color="gray.400">{selected.motoqueiro.user.email}</Text>
                  <Text fontSize="sm" color="gray.400">{selected.motoqueiro.user.telefone}</Text>
                </Box>
              </Flex>

              <SimpleGrid columns={2} gap={4}>
                <Box>
                  <Text fontSize="xs" color="gray.400">Valor pago</Text>
                  <Text fontWeight="bold" color="cyan.400" fontSize="lg">
                    {selected.valor.toLocaleString("pt-AO")} Kz
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.400">Plano</Text>
                  <Badge colorScheme={planoColor[selected.plano]} textTransform="capitalize">
                    {selected.plano}
                  </Badge>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.400">Início</Text>
                  <Text fontSize="sm">{new Date(selected.inicioEm).toLocaleDateString("pt-AO")}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.400">Expiração</Text>
                  <Text fontSize="sm">{new Date(selected.expiraEm).toLocaleDateString("pt-AO")}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.400">Registado em</Text>
                  <Text fontSize="sm">{new Date(selected.criadoEm).toLocaleDateString("pt-AO")}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.400">Classificação</Text>
                  <Text fontSize="sm">
                    {selected.motoqueiro.classificacaoMedia} ⭐ · {selected.motoqueiro.totalAvaliacoes} avaliações
                  </Text>
                </Box>
              </SimpleGrid>

            </ModalBody>

            <ModalFooter>
              <Button size="sm" onClick={onClose}>Fechar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}