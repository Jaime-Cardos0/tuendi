"use client";
import {
  Box, Tag, TagLeftIcon, TagLabel, IconButton,
  Flex, Stack, Select, Input, InputGroup,
  InputLeftElement, Avatar, Text, HStack,
  useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter, Button,
  Divider, SimpleGrid, Badge,
} from "@chakra-ui/react";
import { TableComponent } from "@/components/UI/Table/Table";
import { TableHeader } from "@/components/UI/Table/TableHeader";
import { Pagination } from "@/components/UI/Table/Pagination";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill, RiSearchLine } from "react-icons/ri";
import { useContext, useMemo, useState } from "react";
import { api } from "@/services/api";
import { IPedido, PedidoStatus } from "@/services/mirage/types";
import { DeliveriesContext } from "@/contexts/DeliveriesContext";

const statusColor: Record<PedidoStatus, string> = {
  pendente:                "gray",
  a_procurar_motoqueiro:   "yellow",
  motoqueiro_atribuido:    "blue",
  a_caminho_coleta:        "blue",
  recolhido:               "purple",
  em_transito:             "cyan",
  entregue:                "green",
  cancelado:               "red",
};

const statusLabel: Record<PedidoStatus, string> = {
  pendente:                "Pendente",
  a_procurar_motoqueiro:   "A procurar",
  motoqueiro_atribuido:    "Atribuído",
  a_caminho_coleta:        "A caminho",
  recolhido:               "Recolhido",
  em_transito:             "Em trânsito",
  entregue:                "Entregue",
  cancelado:               "Cancelado",
};

interface Props {
  pedidos: IPedido[];
  setPedidos: React.Dispatch<React.SetStateAction<IPedido[]>>;
}

export function DeliveriesTable() {

  const { cancelarPedido, pedidos } = useContext(DeliveriesContext);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<IPedido | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PedidoStatus | "TODOS">("TODOS");
  const [metodoPagamento, setMetodoPagamento] = useState<"TODOS" | "dinheiro" | "stripe">("TODOS");
  const [sortBy, setSortBy] = useState<"recentes" | "valor">("recentes");

  function openModal(pedido: IPedido) {
    setSelected(pedido);
    onOpen();
  }

  const filtered = useMemo(() => {
    let result = [...pedidos];

    if (statusFilter !== "TODOS")
      result = result.filter((p) => p.status === statusFilter);

    if (metodoPagamento !== "TODOS")
      result = result.filter((p) => p.metodoPagamento === metodoPagamento);

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((p) =>
        p.numeroPedido.toLowerCase().includes(term) ||
        `${p.cliente.nome} ${p.cliente.sobrenome}`.toLowerCase().includes(term) ||
        p.destinoEndereco.toLowerCase().includes(term)
      );
    }

    if (sortBy === "valor") {
      result.sort((a, b) => b.valorEntrega - a.valorEntrega);
    } else {
      result.sort((a, b) =>
        new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      );
    }

    return result;
  }, [pedidos, statusFilter, metodoPagamento, search, sortBy]);

  const columns = [
    {
      header: "Nº Pedido",
      render: (p: IPedido) => (
        <Text fontFamily="mono" fontSize="sm">{p.numeroPedido}</Text>
      ),
    },
    {
      header: "Cliente",
      render: (p: IPedido) => (
        <Flex align="center" gap={2}>
          <Avatar size="sm" src={p.cliente.fotoPerfil} name={`${p.cliente.nome} ${p.cliente.sobrenome}`} />
          <Text>{p.cliente.nome} {p.cliente.sobrenome}</Text>
        </Flex>
      ),
    },
    {
      header: "Motoqueiro",
      render: (p: IPedido) =>
        p.motoqueiro ? (
          <Flex align="center" gap={2}>
            <Avatar size="sm" src={p.userDataMotoqueiro.fotoPerfil} name={`${p.userDataMotoqueiro.nome} ${p.userDataMotoqueiro.sobrenome}`} />
            <Text>{p.userDataMotoqueiro.nome} {p.userDataMotoqueiro.sobrenome}</Text>
          </Flex>
        ) : (
          <Text color="gray.500" fontSize="sm">Não atribuído</Text>
        ),
    },
    {
      header: "Destino",
      render: (p: IPedido) => (
        <Text fontSize="sm" noOfLines={1} maxW="180px">{p.destinoEndereco}</Text>
      ),
    },
    {
      header: "Valor",
      render: (p: IPedido) => (
        <Text>{p.valorEntrega.toLocaleString("pt-AO")} Kz</Text>
      ),
    },
    {
      header: "Status",
      render: (p: IPedido) => (
        <Tag colorScheme={statusColor[p.status]} size="sm">
          <TagLeftIcon as={RiCircleFill} color={`${statusColor[p.status]}.500`} />
          <TagLabel>{statusLabel[p.status]}</TagLabel>
        </Tag>
      ),
    },
    {
      header: "Data",
      render: (p: IPedido) => (
        <Text fontSize="sm">{new Date(p.criadoEm).toLocaleDateString("pt-AO")}</Text>
      ),
    },
    {
      header: "",
      render: (p: IPedido) => (
        <IconButton
          variant="ghost"
          aria-label="Ver detalhes"
          icon={<BsThreeDots />}
          onClick={() => openModal(p)}
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
          <TableHeader title="Pedidos" />

          <Flex justify="space-between" align="center" gap={4} wrap="wrap">
            <InputGroup maxW="280px" size="sm">
              <InputLeftElement pointerEvents="none">
                <RiSearchLine color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Nº pedido, cliente ou destino..."
                rounded="md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            <Flex gap={3} wrap="wrap">
              <Select
                w="fit-content" size="sm" rounded="md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PedidoStatus | "TODOS")}
              >
                <option value="TODOS">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="a_procurar_motoqueiro">A procurar</option>
                <option value="motoqueiro_atribuido">Atribuído</option>
                <option value="a_caminho_coleta">A caminho</option>
                <option value="recolhido">Recolhido</option>
                <option value="em_transito">Em trânsito</option>
                <option value="entregue">Entregue</option>
                <option value="cancelado">Cancelado</option>
              </Select>

              <Select
                w="fit-content" size="sm" rounded="md"
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value as typeof metodoPagamento)}
              >
                <option value="TODOS">Pagamento</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="stripe">Stripe</option>
              </Select>

              <Select
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

      {/* Modal de detalhes */}
      {selected && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg="grayDark.700">
            <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
              <HStack gap={3}>
                <Text fontFamily="mono">{selected.numeroPedido}</Text>
                <Tag colorScheme={statusColor[selected.status]} size="sm">
                  <TagLeftIcon as={RiCircleFill} />
                  <TagLabel>{statusLabel[selected.status]}</TagLabel>
                </Tag>
              </HStack>
              <Badge colorScheme={selected.metodoPagamento === "stripe" ? "purple" : "gray"}>
                {selected.metodoPagamento === "stripe" ? "Stripe" : "Dinheiro"}
              </Badge>
            </ModalHeader>

            <ModalBody display="flex" flexDirection="column" gap={5}>

              {/* Rota */}
              <Box bg="grayDark.600" rounded="lg" p={4}>
                <SimpleGrid columns={2} gap={4}>
                  <Box>
                    <Text fontSize="xs" color="gray.400" mb={1}>Origem</Text>
                    <Text fontSize="sm">{selected.origemEndereco}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.400" mb={1}>Destino</Text>
                    <Text fontSize="sm">{selected.destinoEndereco}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.400" mb={1}>Distância</Text>
                    <Text fontSize="sm">{selected.distanciaKm} km</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.400" mb={1}>Valor</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {selected.valorEntrega.toLocaleString("pt-AO")} Kz
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>

              {/* Encomenda */}
              <Box>
                <Text fontWeight="bold" mb={2}>Encomenda</Text>
                <SimpleGrid columns={2} gap={3}>
                  <Box>
                    <Text fontSize="xs" color="gray.400">Descrição</Text>
                    <Text fontSize="sm">{selected.descricaoEncomenda}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.400">Frágil</Text>
                    <Badge colorScheme={selected.fragil ? "orange" : "gray"}>
                      {selected.fragil ? "Sim" : "Não"}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.400">Criado em</Text>
                    <Text fontSize="sm">{new Date(selected.criadoEm).toLocaleDateString("pt-AO")}</Text>
                  </Box>
                  {selected.entregueEm && (
                    <Box>
                      <Text fontSize="xs" color="gray.400">Entregue em</Text>
                      <Text fontSize="sm">{new Date(selected.entregueEm).toLocaleDateString("pt-AO")}</Text>
                    </Box>
                  )}
                  {selected.canceladoEm && (
                    <Box>
                      <Text fontSize="xs" color="gray.400">Cancelado em</Text>
                      <Text fontSize="sm">{new Date(selected.canceladoEm).toLocaleDateString("pt-AO")}</Text>
                    </Box>
                  )}
                  {selected.motivoCancelamento && (
                    <Box gridColumn="span 2">
                      <Text fontSize="xs" color="gray.400">Motivo de cancelamento</Text>
                      <Text fontSize="sm">{selected.motivoCancelamento}</Text>
                    </Box>
                  )}
                </SimpleGrid>
              </Box>

              <Divider />

              {/* Cliente */}
              <Box>
                <Text fontWeight="bold" mb={3}>Cliente</Text>
                <Flex align="center" gap={3}>
                  <Avatar
                    size="md"
                    src={selected.cliente.fotoPerfil}
                    name={`${selected.cliente.nome} ${selected.cliente.sobrenome}`}
                  />
                  <Box>
                    <Text>{selected.cliente.nome} {selected.cliente.sobrenome}</Text>
                    <Text fontSize="sm" color="gray.400">{selected.cliente.email}</Text>
                    <Text fontSize="sm" color="gray.400">{selected.cliente.telefone}</Text>
                  </Box>
                </Flex>
              </Box>

              <Divider />

              {/* Motoqueiro */}
              <Box>
                <Text fontWeight="bold" mb={3}>Motoqueiro</Text>
                {selected.motoqueiro ? (
                  <Flex align="center" gap={3}>
                    <Avatar
                      size="md"
                      src={selected.userDataMotoqueiro.fotoPerfil}
                      name={`${selected.userDataMotoqueiro.nome} ${selected.userDataMotoqueiro.sobrenome}`}
                    />
                    <Box>
                      <Text>{selected.userDataMotoqueiro.nome} {selected.userDataMotoqueiro.sobrenome}</Text>
                      <Text fontSize="sm" color="gray.400">{selected.userDataMotoqueiro.email}</Text>
                      <Text fontSize="sm" color="gray.400">{selected.userDataMotoqueiro.telefone}</Text>
                      <HStack mt={1}>
                        <Text fontSize="xs" color="gray.400">
                          {selected.motoqueiro.classificacaoMedia} ⭐ · {selected.motoqueiro.totalAvaliacoes} avaliações
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>
                ) : (
                  <Text color="gray.500" fontSize="sm">Nenhum motoqueiro atribuído.</Text>
                )}
              </Box>

            </ModalBody>

            <ModalFooter gap={3}>
              {selected.status !== "cancelado" && selected.status !== "entregue" && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  onClick={() => {onClose(); return cancelarPedido(selected.id)}}
                >
                  Cancelar pedido
                </Button>
              )}
              <Button size="sm" onClick={onClose}>Fechar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}