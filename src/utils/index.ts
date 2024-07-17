

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
        monthName: monthNames[date.getMonth()],
        year: date.getFullYear(),
      });
      previousMonth = date.getMonth();
    }

    // Adiciona os detalhes do dia ao array
    daysDetails.push({
      type: 'day',
      id: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
      monthNumber: month,
      monthName: monthNames[month - 1],
      dayNumber: date.getDate(),
      dayName: dayNames[date.getDay()],
      year: date.getFullYear(),
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

export const isValidDate = (dateString: string) => {
  console.log(dateString)
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    return false;

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12)
    return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};
