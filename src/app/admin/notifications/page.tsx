"use client";

import {
  Box, Flex, Stack, Text, HStack, Button, Tag, TagLabel,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Select,
  Divider, Icon, Badge, Spinner, Center,
} from "@chakra-ui/react";
import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { INotificacao, NotificacaoTipo } from "@/services/mirage/types";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {
  RiCheckDoubleLine, RiCheckLine,
  RiMessage2Line, RiSettings4Line,
  RiShoppingBagLine, RiMotorbikeLine,
  RiBankCardLine, RiCheckboxCircleLine,
} from "react-icons/ri";

// ícone por tipo
const tipoIcon: Record<NotificacaoTipo, React.ElementType> = {
  pedido_criado:   RiShoppingBagLine,
  pedido_aceite:   RiCheckboxCircleLine,
  pedido_entregue: RiMotorbikeLine,
  pagamento:       RiBankCardLine,
  nova_mensagem:   RiMessage2Line,
  sistema:         RiSettings4Line,
};

// cor por tipo
const tipoColor: Record<NotificacaoTipo, string> = {
  pedido_criado:   "blue.400",
  pedido_aceite:   "green.400",
  pedido_entregue: "cyan.400",
  pagamento:       "purple.400",
  nova_mensagem:   "yellow.400",
  sistema:         "gray.400",
};

const tipoBg: Record<NotificacaoTipo, string> = {
  pedido_criado:   "blue",
  pedido_aceite:   "green",
  pedido_entregue: "cyan",
  pagamento:       "purple",
  nova_mensagem:   "yellow",
  sistema:         "gray",
};

const tipoLabel: Record<NotificacaoTipo, string> = {
  pedido_criado:   "Pedido criado",
  pedido_aceite:   "Pedido aceite",
  pedido_entregue: "Pedido entregue",
  pagamento:       "Pagamento",
  nova_mensagem:   "Mensagem",
  sistema:         "Sistema",
};

// agrupa por data
function agruparPorData(notificacoes: INotificacao[]) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const ontem = new Date(hoje);
  ontem.setDate(ontem.getDate() - 1);

  const semana = new Date(hoje);
  semana.setDate(semana.getDate() - 7);

  const grupos: Record<string, INotificacao[]> = {
    "Hoje": [],
    "Ontem": [],
    "Esta semana": [],
    "Mais antigas": [],
  };

  notificacoes.forEach((n) => {
    const data = new Date(n.criadoEm);
    data.setHours(0, 0, 0, 0);

    if (data.getTime() === hoje.getTime()) {
      grupos["Hoje"].push(n);
    } else if (data.getTime() === ontem.getTime()) {
      grupos["Ontem"].push(n);
    } else if (data >= semana) {
      grupos["Esta semana"].push(n);
    } else {
      grupos["Mais antigas"].push(n);
    }
  });

  return grupos;
}

function formatarHora(data: string) {
  return new Date(data).toLocaleTimeString("pt-AO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString("pt-AO");
}

export default function NotificacoesPage() {
  const [dataFilter, setDataFilter] = useState<"TODOS" | "hoje" | "ontem" | "semana" | "mes">("TODOS");
  const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipoFilter, setTipoFilter] = useState<NotificacaoTipo | "TODOS">("TODOS");
  const [estadoFilter, setEstadoFilter] = useState<"TODOS" | "lidas" | "nao_lidas">("TODOS");

  useEffect(() => {
    api.get("/notificacoes")
      .then((res) => setNotificacoes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function marcarComoLida(id: string) {
    await api.patch(`/notificacoes/${id}`, { lida: true });
    setNotificacoes((prev) =>
      prev.map((n) => n.id === id ? { ...n, lida: true } : n)
    );
  }

  async function marcarTodasComoLidas() {
    const naoLidas = notificacoes.filter((n) => !n.lida);
    await Promise.all(naoLidas.map((n) => api.patch(`/notificacoes/${n.id}`, { lida: true })));
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  }

  const totalNaoLidas = useMemo(
    () => notificacoes.filter((n) => !n.lida).length,
    [notificacoes]
  );

  const filtered = useMemo(() => {
  let result = [...notificacoes];

  if (tipoFilter !== "TODOS")
    result = result.filter((n) => n.tipo === tipoFilter);

  if (estadoFilter === "lidas")
    result = result.filter((n) => n.lida);
  else if (estadoFilter === "nao_lidas")
    result = result.filter((n) => !n.lida);

  if (dataFilter !== "TODOS") {
    const agora = new Date();
    const hoje = new Date(agora);
    hoje.setHours(0, 0, 0, 0);

    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);

    const semana = new Date(hoje);
    semana.setDate(semana.getDate() - 7);

    const mes = new Date(hoje);
    mes.setMonth(mes.getMonth() - 1);

    result = result.filter((n) => {
      const data = new Date(n.criadoEm);
      data.setHours(0, 0, 0, 0);

      if (dataFilter === "hoje")
        return data.getTime() === hoje.getTime();
      if (dataFilter === "ontem")
        return data.getTime() === ontem.getTime();
      if (dataFilter === "semana")
        return data >= semana;
      if (dataFilter === "mes")
        return data >= mes;
      return true;
    });
  }

  return result.sort(
    (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
  );
}, [notificacoes, tipoFilter, estadoFilter, dataFilter]);

  const grupos = useMemo(() => agruparPorData(filtered), [filtered]);

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
          <Flex justify="space-between" align="flex-start">
            <Stack>
              <HStack gap={3}>
                <Text lineHeight="1" fontSize="3xl" fontWeight="thin" color="text.primary">
                  Notificações
                </Text>
                {totalNaoLidas > 0 && (
                  <Badge colorScheme="purple" rounded="full" px={2} py={1} fontSize="xs">
                    {totalNaoLidas} novas
                  </Badge>
                )}
              </HStack>
              <Breadcrumb spacing="8px" separator={<MdOutlineKeyboardDoubleArrowRight color="gray.500" />}>
                <BreadcrumbItem>
                  <BreadcrumbLink fontSize="xs" color="text.primary" textTransform="uppercase" href="#">
                    Support Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink fontSize="xs" href="/admin/notifications">
                    Notificações
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Stack>

            <Button
              leftIcon={<RiCheckDoubleLine />}
              size="sm"
              variant="outline"
              colorScheme="purple"
              isDisabled={totalNaoLidas === 0}
              onClick={marcarTodasComoLidas}
            >
              Marcar todas como lidas
            </Button>
          </Flex>

          {/* Filtros */}
          <HStack gap={3}>
            <Select
              w="fit-content" size="sm" rounded="md" bg="navy.600"
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value as typeof estadoFilter)}
            >
              <option value="TODOS">Todas</option>
              <option value="nao_lidas">Não lidas</option>
              <option value="lidas">Lidas</option>
            </Select>

            <Select
              w="fit-content" size="sm" rounded="md" bg="navy.600"
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value as NotificacaoTipo | "TODOS")}
            >
              <option value="TODOS">Todos os tipos</option>
              <option value="pedido_criado">Pedido criado</option>
              <option value="pedido_aceite">Pedido aceite</option>
              <option value="pedido_entregue">Pedido entregue</option>
              <option value="pagamento">Pagamento</option>
              <option value="nova_mensagem">Mensagem</option>
              <option value="sistema">Sistema</option>
            </Select>

            <Select
            w="fit-content" size="sm" rounded="md" bg="navy.600"
            value={dataFilter}
            onChange={(e) => setDataFilter(e.target.value as typeof dataFilter)}
            >
              <option value="TODOS">Todas as datas</option>
              <option value="hoje">Hoje</option>
              <option value="ontem">Ontem</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mês</option>
            </Select>
          </HStack>

          {/* Feed */}
          <Stack gap={6}>
            {Object.entries(grupos).map(([grupo, items]) => {
              if (items.length === 0) return null;
              return (
                <Stack key={grupo} gap={3}>
                  {/* Label do grupo */}
                  <HStack gap={3}>
                    <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wide">
                      {grupo}
                    </Text>
                    <Divider flex={1} borderColor="border.default" />
                    <Text fontSize="xs" color="text.muted">{items.length}</Text>
                  </HStack>

                  {/* Itens */}
                  <Stack gap={2}>
                    {items.map((n) => (
                      <Flex
                        key={n.id}
                        bg="bg.card"
                        border="1px solid"
                        borderColor="border.default"
                        rounded="lg"
                        overflow="hidden"
                        opacity={n.lida ? 0.6 : 1}
                        transition="all 0.2s"
                        _hover={{ borderColor: "border.subtle", opacity: 1 }}
                      >
                        {/* Barra lateral colorida */}
                        <Box
                          w="3px"
                          bg={n.lida ? "navy.500" : tipoColor[n.tipo]}
                          flexShrink={0}
                        />

                        <Flex flex={1} p={4} justify="space-between" align="center" gap={4}>
                          <HStack gap={4} flex={1}>
                            {/* Ícone */}
                            <Flex
                              w={10} h={10}
                              rounded="lg"
                              bg={`${tipoBg[n.tipo]}.900`}
                              border="1px solid"
                              borderColor={`${tipoBg[n.tipo]}.700`}
                              align="center"
                              justify="center"
                              flexShrink={0}
                            >
                              <Icon
                                as={tipoIcon[n.tipo]}
                                color={tipoColor[n.tipo]}
                                boxSize={5}
                              />
                            </Flex>

                            {/* Conteúdo */}
                            <Box flex={1}>
                              <HStack gap={2} mb={1}>
                                <Text fontSize="sm" fontWeight="semibold">
                                  {n.titulo}
                                </Text>
                                <Tag colorScheme={tipoBg[n.tipo]} size="xs">
                                  <TagLabel>{tipoLabel[n.tipo]}</TagLabel>
                                </Tag>
                                {!n.lida && (
                                  <Box w={2} h={2} rounded="full" bg="brand.500" flexShrink={0} />
                                )}
                              </HStack>
                              <Text fontSize="xs" color="text.secondary" noOfLines={2}>
                                {n.mensagem}
                              </Text>
                            </Box>
                          </HStack>

                          {/* Data e acções */}
                          <Stack align="flex-end" gap={2} flexShrink={0}>
                            <Text fontSize="xs" color="text.muted">
                              {grupo === "Hoje" || grupo === "Ontem"
                                ? formatarHora(n.criadoEm)
                                : formatarData(n.criadoEm)
                              }
                            </Text>
                            {!n.lida && (
                              <Button
                                size="xs"
                                variant="ghost"
                                colorScheme="purple"
                                leftIcon={<RiCheckLine />}
                                onClick={() => marcarComoLida(n.id)}
                              >
                                Marcar como lida
                              </Button>
                            )}
                          </Stack>
                        </Flex>
                      </Flex>
                    ))}
                  </Stack>
                </Stack>
              );
            })}

            {filtered.length === 0 && (
              <Center py={16}>
                <Stack align="center" gap={3}>
                  <Icon as={RiCheckDoubleLine} boxSize={10} color="text.muted" />
                  <Text color="text.muted" fontSize="sm">Nenhuma notificação encontrada.</Text>
                </Stack>
              </Center>
            )}
          </Stack>

        </Box>
      </Flex>
    </Flex>
  );
}