"use client";

import { api } from "@/services/api";
import { IMotoqueiro, MotoqueiroStatus } from "@/services/mirage/types";
import {
  Flex, Avatar, Box, Divider, Button, Text,
  HStack, Stack, Tag, TagLabel, TagLeftIcon,
  Image, SimpleGrid, Spinner, Center,
  Tabs, TabList, Tab, TabPanels, TabPanel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { RiCircleFill } from "react-icons/ri";
import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";

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

// Helpers para buscar uploads por tipo
function getUpload(uploads: IMotoqueiro["uploads"], tipo: string) {
  return uploads.find((u) => u.tipo === tipo)?.url ?? "";
}

export default function ViewMorePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [rider, setRider] = useState<IMotoqueiro | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/motoqueiros/${id}`)        // ✅ rota correcta
      .then((res) => setRider(res.data)) // ✅ array directo
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  async function updateStatus(status: MotoqueiroStatus) {
    if (!rider) return;
    await api.patch(`/motoqueiros/${rider.id}`, { status });
    setRider((prev) => (prev ? { ...prev, status } : prev));
  }

  if (loading) return (
    <Center h="100vh"><Spinner size="xl" /></Center>
  );

  if (!rider) return (
    <Center h="100vh"><Text>Motoqueiro não encontrado.</Text></Center>
  );

  // uploads extraídos
  const biFrente   = getUpload(rider.uploads, "documento_bi_frente");
  const biVerso    = getUpload(rider.uploads, "documento_bi_verso");
  const cartaFrente = getUpload(rider.uploads, "documento_carta_frente");
  const cartaVerso  = getUpload(rider.uploads, "documento_carta_verso");
  const fotoVeiculo = getUpload(rider.uploads, "foto_veiculo");

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" maxW="1440px" my={6} mx="auto" px={8}>
        <Sidebar />

        <Box as="main" w="100%" ml={52} mt={20}>

          {/* Cabeçalho */}
          <Flex justify="space-between" align="center" mb={8}>
            <HStack gap={4}>
              <Avatar
                size="xl"
                src={rider.user.fotoPerfil}
                name={`${rider.user.nome} ${rider.user.sobrenome}`}
              />
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  {rider.user.nome} {rider.user.sobrenome}
                </Text>
                <Text color="gray.400">{rider.user.email}</Text>
                <Text color="gray.400" fontSize="sm">{rider.user.telefone}</Text>
              </Box>
              <Tag colorScheme={statusColor[rider.status]} size="md">
                <TagLeftIcon as={RiCircleFill} />
                <TagLabel>{statusLabel[rider.status]}</TagLabel>
              </Tag>
            </HStack>

            {/* Acções */}
            <HStack gap={3}>
              <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => updateStatus("suspenso")}
              >
                Suspender
              </Button>
              <Button
                colorScheme="cyan"
                size="sm"
                onClick={() => updateStatus("activo")}
              >
                Aprovar
              </Button>
            </HStack>
          </Flex>

          <Divider mb={8} />

          {/* Tabs */}
          <Tabs variant="soft-rounded" colorScheme="cyan">
            <TabList mb={6} gap={2}>
              <Tab>Informações Gerais</Tab>
              <Tab>Documentos</Tab>
              <Tab>Veículo</Tab>
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
                        <Text>{rider.user.nome} {rider.user.sobrenome}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Data de nascimento</Text>
                        <Text>{new Date(rider.user.dataNascimento).toLocaleDateString("pt-AO")}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Telefone</Text>
                        <Text>{rider.user.telefone}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">E-mail</Text>
                        <Text>{rider.user.email}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Morada</Text>
                        <Text>{rider.morada}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Membro desde</Text>
                        <Text>{new Date(rider.criadoEm).toLocaleDateString("pt-AO")}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
                    <Text fontWeight="bold" fontSize="lg" mb={4}>Estatísticas</Text>
                    <SimpleGrid columns={2} gap={4}>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Classificação média</Text>
                        <Text>{rider.classificacaoMedia} ⭐</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Total de avaliações</Text>
                        <Text>{rider.totalAvaliacoes}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400">Disponibilidade</Text>
                        <Text textTransform="capitalize">{rider.statusDisponibilidade}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Stack>
              </TabPanel>

              {/* Tab 2 — Documentos */}
              <TabPanel px={0}>
                <Stack gap={6}>
                  <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
                    <Text fontWeight="bold" fontSize="lg" mb={1}>Bilhete de Identidade</Text>
                    <Text fontSize="sm" color="gray.400" mb={4}>
                      Nº {rider.user.numeroDocumento}
                    </Text>
                    <SimpleGrid columns={2} gap={4}>
                      <Box>
                        <Text fontSize="sm" color="gray.400" mb={2}>Frente</Text>
                        <Image
                          src={biFrente} alt="BI Frente"
                          rounded="md" w="100%" h="180px" objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/400x180?text=Sem+imagem"
                        />
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400" mb={2}>Verso</Text>
                        <Image
                          src={biVerso} alt="BI Verso"
                          rounded="md" w="100%" h="180px" objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/400x180?text=Sem+imagem"
                        />
                      </Box>
                    </SimpleGrid>
                  </Box>

                  <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
                    <Text fontWeight="bold" fontSize="lg" mb={4}>Carta de Condução</Text>
                    <SimpleGrid columns={2} gap={4}>
                      <Box>
                        <Text fontSize="sm" color="gray.400" mb={2}>Frente</Text>
                        <Image
                          src={cartaFrente} alt="Carta Frente"
                          rounded="md" w="100%" h="180px" objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/400x180?text=Sem+imagem"
                        />
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.400" mb={2}>Verso</Text>
                        <Image
                          src={cartaVerso} alt="Carta Verso"
                          rounded="md" w="100%" h="180px" objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/400x180?text=Sem+imagem"
                        />
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Stack>
              </TabPanel>

              {/* Tab 3 — Veículo */}
              <TabPanel px={0}>
                <Box bg="grayDark.700" border="2px" borderColor="grayDark.500" rounded="xl" p={6}>
                  <Text fontWeight="bold" fontSize="lg" mb={4}>Dados do Veículo</Text>
                  <SimpleGrid columns={2} gap={4} mb={6}>
                    <Box>
                      <Text fontSize="sm" color="gray.400">Marca / Modelo</Text>
                      <Text>{rider.veiculo.marca} {rider.veiculo.modelo}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.400">Ano</Text>
                      <Text>{rider.veiculo.ano}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.400">Placa</Text>
                      <Text>{rider.veiculo.placa}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.400">Cor</Text>
                      <HStack gap={2}>
                        <Box
                          w="16px" h="16px" rounded="full"
                          bg={rider.veiculo.corPrincipal}
                          border="1px solid"
                          borderColor="whiteAlpha.300"
                        />
                        <Text textTransform="capitalize">{rider.veiculo.corPrincipal}</Text>
                      </HStack>
                    </Box>
                  </SimpleGrid>

                  <Text fontSize="sm" color="gray.400" mb={2}>Foto do veículo</Text>
                  <Image
                    src={fotoVeiculo} alt="Veículo"
                    rounded="md" w="100%" h="220px" objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/800x220?text=Sem+imagem"
                  />
                </Box>
              </TabPanel>

            </TabPanels>
          </Tabs>

        </Box>
      </Flex>
    </Flex>
  );
}