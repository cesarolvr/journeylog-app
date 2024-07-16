

export const getDaysDetailsInMonth = (month: any, year: any) => {
  // Array com os nomes dos meses
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Array com os nomes dos dias da semana
  const dayNames = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];

  // Cria um array para armazenar os detalhes dos dias
  const daysDetails = [];

  // Obtém a data atual
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Months are 0-based in JavaScript Date
  const currentDay = today.getDate();

  // Ajusta o mês para zero-based (0 = Janeiro, 1 = Fevereiro, etc.)
  const date = new Date(year, month - 1, 1);

  // Variável para acompanhar a mudança de mês
  let previousMonth = -1;

  // Percorre todos os dias do mês até o dia atual (ou fim do mês)
  while (date.getMonth() === month - 1) {
    if (year === currentYear && month === currentMonth && date.getDate() > currentDay) {
      break;
    }

    if (date.getMonth() !== previousMonth) {
      daysDetails.push({
        type: 'monthChange',
        monthName: `${monthNames[date.getMonth()]}, ${date.getFullYear()}`,
      });
      previousMonth = date.getMonth();
    }

    // Adiciona os detalhes do dia ao array
    daysDetails.push({
      type: 'day',
      monthName: monthNames[month - 1],
      dayNumber: date.getDate(),
      dayName: dayNames[date.getDay()]
    });
    // Incrementa o dia
    date.setDate(date.getDate() + 1);
  }

  daysDetails.sort((a: any, b: any) => {
    if (a.type === 'monthChange' || b.type === 'monthChange') {
      return 0;
    }
    return b.dayNumber - a.dayNumber
  });

  return daysDetails;

};
