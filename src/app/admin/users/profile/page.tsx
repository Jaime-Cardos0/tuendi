"use client";

import { api } from "@/services/api";
import { IUser, UserStatus, Role } from "@/services/mirage/types";
import {
  Flex, Avatar, Box, Divider, Button, Text,
  HStack, Stack, Tag, TagLabel, TagLeftIcon,
  SimpleGrid, Spinner, Center,
  Tabs, TabList, Tab, TabPanels, TabPanel,
  Table, Thead, Tbody, Tr, Th, Td,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RiCircleFill } from "react-icons/ri";
import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const statusColor: Record<UserStatus, string> = {
  activo: "cyan",
  suspenso: "red",
};

const statusLabel: Record<UserStatus, string> = {
  activo: "Activo",
  suspenso: "Suspenso",
};

const roleLabel: Record<Role, string> = {
  cliente: "Cliente",
  motoqueiro: "Motoqueiro",
  admin: "Admin",
};

const roleColor: Record<Role, string> = {
  cliente: "blue",
  motoqueiro: "purple",
  admin: "orange",
};

export default function UserProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  async function updateStatus(status: UserStatus) {
    if (!user) return;
    await api.patch(`/users/${user.id}`, { status });
    setUser((prev) => (prev ? { ...prev, status } : prev));
  }

  async function deleteUser() {
    if (!user) return;
    await api.delete(`/users/${user.id}`);
    router.push("/admin/users");
  }

  if (loading) return (
    <Center h="100vh"><Spinner size="xl" /></Center>
  );

  if (!user) return (
    <Center h="100vh"><Text>Utilizador não encontrado.</Text></Center>
  );

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Breadcrumb spacing='8px' separator={<MdOutlineKeyboardDoubleArrowRight color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink fontSize={"xs"} fontWeight={"hairline"} color={"text.primary"} letterSpacing={"wide"} textTransform={"uppercase"} href='#'>Main Admin</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink fontWeight={"normal"} letterSpacing={"spaced"} textAlign={"end"} href='/admin/users'>Usuários</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink fontWeight={"normal"} letterSpacing={"spaced"} textAlign={"end"} href='/admin/users/profile'>Perfil</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex w="100%" maxW="1440px" my={6} mx="auto" px={8}>
        <Sidebar />

        <Box as="main" w="100%" ml={52} mt={20}>

          {/* Cabeçalho */}
          <Flex justify="space-between" align="center" mb={8}>
            <HStack gap={4}>
              <Avatar
                size="xl"
                src={user.fotoPerfil}
                name={`${user.nome} ${user.sobrenome}`}
              />
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  {user.nome} {user.sobrenome}
                </Text>
                <Text color="gray.400">{user.email}</Text>
                <Text color="gray.400" fontSize="sm">{user.telefone}</Text>
              </Box>
              <Stack gap={2}>
                <Tag colorScheme={statusColor[user.status]} size="md">
                  <TagLeftIcon as={RiCircleFill} />
                  <TagLabel>{statusLabel[user.status]}</TagLabel>
                </Tag>
                <Tag colorScheme={roleColor[user.role]} size="md">
                  <TagLabel>{roleLabel[user.role]}</TagLabel>
                </Tag>
              </Stack>
            </HStack>

            {/* Acções */}
            <HStack gap={3}>
              <Button
                colorScheme="red"
                variant="ghost"
                size="sm"
                onClick={deleteUser}
              >
                Eliminar conta
              </Button>
              {user.status === "activo" ? (
                <Button
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus("suspenso")}
                >
                  Suspender
                </Button>
              ) : (
                <Button
                  colorScheme="cyan"
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus("activo")}
                >
                  Reactivar
                </Button>
              )}
            </HStack>
          </Flex>

          {/* <Divider mb={8} /> */}

          {/* Tabs */}
          <Tabs variant="line" colorScheme="cyan">
            <TabList mb={6} gap={2}>
              <Tab>Informações Gerais</Tab>
              <Tab>Pedidos</Tab>
              <Tab>Suporte</Tab>
            </TabList>

            <TabPanels>

              {/* Tab 1 — Informações Gerais */}
              <TabPanel px={0}>
                <Stack gap={6}>
                  <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
                    <Text fontWeight="bold" fontSize="lg" mb={4}>Dados Pessoais</Text>
                    <SimpleGrid columns={2} gap={4}>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Nome completo</Text>
                        <Text>{user.nome} {user.sobrenome}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Data de nascimento</Text>
                        <Text>{new Date(user.dataNascimento).toLocaleDateString("pt-AO")}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">E-mail</Text>
                        <Text>{user.email}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Telefone</Text>
                        <HStack gap={2}>
                          <Text>{user.telefone}</Text>
                          <Badge colorScheme={user.telefoneVerificado ? "cyan" : "gray"} fontSize="xs">
                            {user.telefoneVerificado ? "Verificado" : "Não verificado"}
                          </Badge>
                        </HStack>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Documento</Text>
                        <Text>{user.tipoDocumento}: {user.numeroDocumento}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Membro desde</Text>
                        <Text>{new Date(user.criadoEm).toLocaleDateString("pt-AO")}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Stack>
              </TabPanel>

              {/* Tab 2 — Pedidos */}
              <TabPanel px={0}>
                <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
                  <Text fontWeight="bold" fontSize="lg" mb={4}>Histórico de Pedidos</Text>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th color="gray.400">Nº Pedido</Th>
                        <Th color="gray.400">Origem</Th>
                        <Th color="gray.400">Destino</Th>
                        <Th color="gray.400">Valor</Th>
                        <Th color="gray.400">Status</Th>
                        <Th color="gray.400">Data</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td colSpan={6}>
                          <Text color="gray.400" textAlign="center" py={4}>
                            Os pedidos serão carregados em breve.
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Tab 3 — Suporte */}
              <TabPanel px={0}>
                <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
                  <Text fontWeight="bold" fontSize="lg" mb={4}>Tickets de Suporte</Text>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th color="gray.400">Título</Th>
                        <Th color="gray.400">Status</Th>
                        <Th color="gray.400">Data</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td colSpan={3}>
                          <Text color="gray.400" textAlign="center" py={4}>
                            Os tickets de suporte serão carregados em breve.
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

            </TabPanels>
          </Tabs>

        </Box>
      </Flex>
    </Flex>
  );
}