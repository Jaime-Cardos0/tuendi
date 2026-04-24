"use client";
import {
  Box, IconButton, Tag, TagLeftIcon, TagLabel,
  useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter, Button,
  Text, Flex, Avatar, Divider, Select
} from "@chakra-ui/react";
import { TableComponent } from "@/components/UI/Table/Table";
import { TableHeader } from "@/components/UI/Table/TableHeader";
import { Pagination } from "@/components/UI/Table/Pagination";
import { BsThreeDots } from "react-icons/bs";
import { RiCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { IRider, RiderStatus } from "@/services/mirage/types";

const statusColor: Record<RiderStatus, string> = {
  PENDENTE: "yellow",
  APROVADO: "cyan",
  RECUSADO: "purple",
  REVISAO: "orange",
};

const statusLabel: Record<RiderStatus, string> = {
  PENDENTE: "Pendente",
  APROVADO: "Aprovado",
  RECUSADO: "Recusado",
  REVISAO: "Revisão",
};

export function RidersTable() {
  const [riders, setRiders] = useState<IRider[]>([]);
  const [selected, setSelected] = useState<IRider | null>(null);
  const [filter, setFilter] = useState<RiderStatus | "TODOS">("TODOS");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    api.get("/riders")
      .then((res) => setRiders(res.data.riders))
      .catch((err) => console.error(err));
  }, []);

  function openModal(rider: IRider) {
    setSelected(rider);
    onOpen();
  }

  async function updateStatus(id: string, status: RiderStatus) {
    await api.patch(`/riders/${id}`, { status });
    setRiders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    onClose();
  }

  const filtered = filter === "TODOS"
    ? riders
    : riders.filter((r) => r.status === filter);

  const columns = [
    { header: "Nome", render: (r: IRider) => (
      <Flex align="center" gap={2}>
        <Avatar size="sm" src={r.profilePhoto} name={`${r.firstName} ${r.lastName}`} />
        <Text>{r.firstName} {r.lastName}</Text>
      </Flex>
    )},
    { header: "E-mail", accessor: "email" },
    { header: "Placa", accessor: "vehiclePlate" },
    { header: "Veículo", render: (r: IRider) => (
      <Text>{r.vehicleBrand} {r.vehicleModel}</Text>
    )},
    { header: "Data", render: (r: IRider) => (
      <Text>{new Date(r.createdAt).toLocaleDateString("pt-AO")}</Text>
    )},
    { header: "Status", render: (r: IRider) => (
      <Tag colorScheme={statusColor[r.status]} size="sm">
        <TagLeftIcon as={RiCircleFill} color={`${statusColor[r.status]}.500`} />
        <TagLabel>{statusLabel[r.status]}</TagLabel>
      </Tag>
    )},
    { header: "", render: (r: IRider) => (
      <IconButton
        variant="ghost"
        aria-label="Ver detalhes"
        icon={<BsThreeDots />}
        onClick={() => openModal(r)}
      />
    )},
  ];

  return (
    <>
      <Box p={8} display="flex" gap={8} flexDirection="column" mb={8}
        bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl">

        <Flex justify="space-between" align="center">
          <TableHeader title="Motoristas"/>
          <Select
            w="fit-content"
            size="sm"
            rounded="md"
            value={filter}
            onChange={(e) => setFilter(e.target.value as RiderStatus | "TODOS")}
          >
            <option value="TODOS">Todos</option>
            <option value="PENDENTE">Pendentes</option>
            <option value="APROVADO">Aprovados</option>
            <option value="RECUSADO">Recusados</option>
            <option value="REVISAO">Revisão</option>
          </Select>
        </Flex>

        <TableComponent data={filtered} columns={columns} />
        <Pagination />
      </Box>

      {/* Modal de detalhes */}
      {selected && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent bg="grayDark.700">
            <ModalHeader>
              {selected.firstName} {selected.lastName}
            </ModalHeader>

            <ModalBody display="flex" flexDirection="column" gap={4}>
              <Flex gap={4}>
                <Avatar size="xl" src={selected.profilePhoto} />
                <Box>
                  <Text fontSize="sm" color="gray.400">E-mail</Text>
                  <Text>{selected.email}</Text>
                  <Text fontSize="sm" color="gray.400" mt={2}>Data de nascimento</Text>
                  <Text>{new Date(selected.birthDate).toLocaleDateString("pt-AO")}</Text>
                </Box>
              </Flex>

              <Divider />

              <Box>
                <Text fontWeight="bold" mb={2}>Bilhete de Identidade</Text>
                <Text fontSize="sm" color="gray.400">Número: {selected.biNumber}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Carta de Condução</Text>
                <Text fontSize="sm" color="gray.400">Número: {selected.licenseNumber}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Veículo</Text>
                <Text fontSize="sm" color="gray.400">
                  {selected.vehicleBrand} {selected.vehicleModel} — {selected.vehicleColor}
                </Text>
                <Text fontSize="sm" color="gray.400">Placa: {selected.vehiclePlate}</Text>
              </Box>
            </ModalBody>

            <ModalFooter gap={3}>
              <Button
                colorScheme="purple"
                variant="outline"
                size="sm"
                onClick={() => updateStatus(selected.id, "RECUSADO")}
              >
                Recusar
              </Button>
              <Button
                colorScheme="orange"
                variant="outline"
                size="sm"
                onClick={() => updateStatus(selected.id, "REVISAO")}
              >
                Pedir revisão
              </Button>
              <Button
                colorScheme="cyan"
                size="sm"
                onClick={() => updateStatus(selected.id, "APROVADO")}
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