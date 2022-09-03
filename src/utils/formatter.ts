export const { format: dateFormatter } = new Intl.DateTimeFormat("pt-BR");

export const { format: priceFormatter } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
