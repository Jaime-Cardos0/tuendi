"use client";
import { Box, Flex, Avatar, Text, Tag, TagLeftIcon, TagLabel, IconButton } from "@chakra-ui/react";
import { TableComponent } from "@/components/UI/Table/Table";
import { TableHeader } from "@/components/UI/Table/TableHeader";
import { Pagination } from "@/components/UI/Table/Pagination";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill } from "react-icons/ri";
import { IPedido, PedidoStatus } from "@/services/mirage/types";
import { useContext } from "react";
import { DashboardContext } from "@/contexts/DashboardContext";

const statusColor: Record<PedidoStatus, string> = {
  pendente:              "gray",
  a_procurar_motoqueiro: "yellow",
  motoqueiro_atribuido:  "blue",
  a_caminho_coleta:      "orange",
  recolhido:             "purple",
  em_transito:           "cyan",
  entregue:              "green",
  cancelado:             "red",
};

const statusLabel: Record<PedidoStatus, string> = {
  pendente:              "Pendente",
  a_procurar_motoqueiro: "A procurar",
  motoqueiro_atribuido:  "Atribuído",
  a_caminho_coleta:      "A caminho",
  recolhido:             "Recolhido",
  em_transito:           "Em trânsito",
  entregue:              "Entregue",
  cancelado:             "Cancelado",
};

export function DashboardTable() {
  
  const { pedidos } = useContext(DashboardContext);

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
      header: "Status",
      render: (p: IPedido) => (
        <Tag colorScheme={statusColor[p.status]} size="sm">
          <TagLeftIcon as={RiCircleFill} color={`${statusColor[p.status]}.500`} />
          <TagLabel>{statusLabel[p.status]}</TagLabel>
        </Tag>
      ),
    },
    {
      header: "",
      render: () => (
        <IconButton variant="ghost" aria-label="Ver detalhes" icon={<BsThreeDots />} />
      ),
    },
  ];

  return (
    <Box
      p={6} display="flex" gap={6} flexDirection="column" mb={8}
      bg="bg.card" border="2px" borderColor="border.default" rounded="lg"
    >
      <TableHeader title="Últimas Entregas" />
      <TableComponent data={pedidos} columns={columns} />
      <Pagination />
    </Box>
  );
}