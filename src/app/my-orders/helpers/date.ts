export const formatDate = (unformmatedDate: Date) => {
  return new Date(unformmatedDate).toLocaleDateString("pt-BR");
};
