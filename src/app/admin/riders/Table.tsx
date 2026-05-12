"use client";
import {
  Box, IconButton, Tag, TagLeftIcon, TagLabel,
  useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter, Button,
  Text, Flex, Avatar, Divider, Select, Stack,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  SimpleGrid,
  AvatarBadge,
} from "@chakra-ui/react";
import { TableComponent } from "@/components/UI/Table/Table";
import { TableHeader } from "@/components/UI/Table/TableHeader";
import { Pagination } from "@/components/UI/Table/Pagination";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill, RiSearchLine } from "react-icons/ri";
import { useContext, useMemo, useState } from "react";
import { DisponibilidadeStatus, IMotoqueiro, MotoqueiroStatus } from "@/services/mirage/types";
import { useRouter } from "next/navigation";
import { RidersContext } from "@/contexts/RidersContext";

const statusColor: Record<MotoqueiroStatus, string> = {
  pendente_aprovacao: "yellow",
  activo: "cyan",
  suspenso: "red",
};

const statusLabel: Record<MotoqueiroStatus, string> = {
  pendente_aprovacao: "Pendente",
  activo: "Activo",
  suspenso: "Suspenso",
};

const disponibilidadeColor: Record<DisponibilidadeStatus, string> = {
  online: "green",
  offline: "gray",
  ocupado: "purple",
};

const disponibilidadeLabel: Record<DisponibilidadeStatus, string> = {
  online: "Online",
  offline: "Offline",
  ocupado: "Ocupado",
};

export function RidersTable() {
  const router = useRouter();
  const { riders, updateStatus } = useContext(RidersContext);
  const [selected, setSelected] = useState<IMotoqueiro | null>(null);
  const [filter, setFilter] = useState<MotoqueiroStatus | "TODOS">("TODOS");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"recentes" | "avaliacao">("recentes");
  const [dispFilter, setDispFilter] = useState<"TODOS" | DisponibilidadeStatus>("TODOS");
  const filtered = useMemo(() => {
    let result = filter === "TODOS" ? riders : riders.filter((r) => r.status === filter);

    if (dispFilter !== "TODOS") {
      result = result.filter((r) => r.statusDisponibilidade === dispFilter);
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((r) =>
        `${r.user.nome} ${r.user.sobrenome}`.toLowerCase().includes(term) ||
        r.user.email.toLowerCase().includes(term)
      );
    }

    if (sortBy === "avaliacao") {
      result = [...result].sort((a, b) => b.classificacaoMedia - a.classificacaoMedia);
    } else {
      result = [...result].sort((a, b) =>
        new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      );
    }

    return result;
  }, [riders, filter, dispFilter, search, sortBy]);

  function openModal(rider: IMotoqueiro) {
    setSelected(rider);
    onOpen();
  }

  // const filtered = filter === "TODOS"
  //   ? riders
  //   : riders.filter((r) => r.status === filter);

  const columns = [
    {
      header: "Nome",
      render: (r: IMotoqueiro) => (
        <Flex align="center" gap={2}>
          <Avatar size="sm" src={r.user.fotoPerfil} name={`${r.user.nome} ${r.user.sobrenome}`} > <AvatarBadge boxSize={"1em"} bg={disponibilidadeColor[r.statusDisponibilidade]} /></Avatar>
          <Text>{r.user.nome} {r.user.sobrenome}</Text>
        </Flex>
      ),
    },
    { header: "E-mail", render: (r: IMotoqueiro) => <Text>{r.user.email}</Text> },
    { header: "Placa", render: (r: IMotoqueiro) => <Text>{r.veiculo.placa}</Text> },
    {
      header: "Veículo",
      render: (r: IMotoqueiro) => (
        <Text>{r.veiculo.marca} {r.veiculo.modelo}</Text>
      ),
    },
    {
      header: "Data",
      render: (r: IMotoqueiro) => (
        <Text>{new Date(r.criadoEm).toLocaleDateString("pt-AO")}</Text>
      ),
    },
    {header: "Avaliação", render: (r: IMotoqueiro) => <Text>{r.classificacaoMedia} ⭐</Text>},
    {
      header: "Status",
      render: (r: IMotoqueiro) => (
        <Tag colorScheme={statusColor[r.status]} size="sm">
          <TagLeftIcon as={RiCircleFill} color={`${statusColor[r.status]}.500`} />
          <TagLabel>{statusLabel[r.status]}</TagLabel>
        </Tag>
      ),
    },
    {
      header: "",
      render: (r: IMotoqueiro) => (
        <IconButton
          variant="ghost"
          aria-label="Ver detalhes"
          icon={<BsThreeDots />}
          onClick={() => openModal(r)}
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
          <TableHeader title="Motoristas" />

          <Flex justify="space-between" align="center" gap={4} wrap="wrap">
            {/* Barra de pesquisa */}
            <InputGroup maxW="280px" size="sm">
              <InputLeftElement pointerEvents="none">
                <RiSearchLine color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Pesquisar por nome ou email..."
                rounded="md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            <Flex gap={3} align="center" wrap="wrap">
              {/* Filtro por status */}
              <Select
                w="fit-content" size="sm" rounded="md"
                value={filter}
                onChange={(e) => setFilter(e.target.value as MotoqueiroStatus | "TODOS")}
              >
                <option value="TODOS">Todos os status</option>
                <option value="pendente_aprovacao">Pendentes</option>
                <option value="activo">Activos</option>
                <option value="suspenso">Suspensos</option>
              </Select>

              {/* Filtro por disponibilidade */}
              <Select
                w="fit-content" size="sm" rounded="md"
                value={dispFilter}
                onChange={(e) => setDispFilter(e.target.value as typeof dispFilter)}
              >
                <option value="TODOS">Disponibilidade</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="ocupado">Ocupado</option>
              </Select>

              {/* Ordenação */}
              <Select
                w="fit-content" size="sm" rounded="md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              >
                <option value="recentes">Mais recentes</option>
                <option value="avaliacao">Melhor avaliação</option>
              </Select>
            </Flex>
          </Flex>
        </Stack>

        <TableComponent data={filtered} columns={columns} />
        <Pagination />
      </Box>

      {selected && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent bg="grayDark.700">
            <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
              <HStack gap={3}>
                <Text>{selected.user.nome} {selected.user.sobrenome}</Text>
                <Tag colorScheme={statusColor[selected.status]} size="sm">
                  <TagLeftIcon as={RiCircleFill} />
                  <TagLabel>{statusLabel[selected.status]}</TagLabel>
                </Tag>
              </HStack>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onClose();
                  router.push(`/admin/riders/viewMore?id=${selected.id}`);
                }}
              >
                Ver mais
              </Button>
            </ModalHeader>

            <ModalBody display="flex" flexDirection="column" gap={4}>

              {/* Perfil */}
              <Flex gap={4} align="center">
                <Avatar size="xl" src={selected.user.fotoPerfil} name={`${selected.user.nome} ${selected.user.sobrenome}`} />
                <Box>
                  <Text fontSize="sm" color="gray.400">E-mail</Text>
                  <Text>{selected.user.email}</Text>
                  <Text fontSize="sm" color="gray.400" mt={2}>Telefone</Text>
                  <Text>{selected.user.telefone}</Text>
                  <Text fontSize="sm" color="gray.400" mt={2}>Data de nascimento</Text>
                  <Text>{new Date(selected.user.dataNascimento).toLocaleDateString("pt-AO")}</Text>
                </Box>
              </Flex>

              <Divider />

              {/* Estatísticas */}
              <SimpleGrid columns={3} gap={3}>
                <Box bg="grayDark.600" rounded="lg" p={3} textAlign="center">
                  <Text fontSize="xs" color="gray.400" mb={1}>Avaliação</Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {selected.classificacaoMedia} ⭐
                  </Text>
                </Box>
                <Box bg="grayDark.600" rounded="lg" p={3} textAlign="center">
                  <Text fontSize="xs" color="gray.400" mb={1}>Avaliações</Text>
                  <Text fontWeight="bold" fontSize="lg">{selected.totalAvaliacoes}</Text>
                </Box>
                <Box bg="grayDark.600" rounded="lg" p={3} textAlign="center">
                  <Text fontSize="xs" color="gray.400" mb={1}>Disponibilidade</Text>
                  <Text fontWeight="bold" fontSize="sm" textTransform="capitalize">
                    {selected.statusDisponibilidade}
                  </Text>
                </Box>
              </SimpleGrid>

              <Divider />

              {/* Documento */}
              <Box>
                <Text fontWeight="bold" mb={2}>Documento</Text>
                <Text fontSize="sm" color="gray.400">
                  {selected.user.tipoDocumento}: {selected.user.numeroDocumento}
                </Text>
              </Box>

              {/* Veículo */}
              <Box>
                <Text fontWeight="bold" mb={2}>Veículo</Text>
                <Text fontSize="sm" color="gray.400">
                  {selected.veiculo.marca} {selected.veiculo.modelo} — Ano {selected.veiculo.ano}
                </Text>
                <HStack gap={2} mt={1}>
                  <Text fontSize="sm" color="gray.400">Cor:</Text>
                  <Box
                    w="14px" h="14px" rounded="full"
                    bg={selected.veiculo.corPrincipal}
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                  />
                  <Text fontSize="sm" color="gray.400" textTransform="capitalize">
                    {selected.veiculo.corPrincipal}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.400" mt={1}>Placa: {selected.veiculo.placa}</Text>
              </Box>

            </ModalBody>

            <ModalFooter gap={3}>
              <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => { onClose(); updateStatus({ id: selected.id, status: "suspenso" }); }}
              >
                Suspender
              </Button>
              <Button
                colorScheme="cyan"
                size="sm"
                onClick={() => { onClose(); updateStatus({ id: selected.id, status: "activo" }); }}
              >
                Aprovar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}