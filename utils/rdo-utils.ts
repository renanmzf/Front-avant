import type { RDO, DetailedRDO, WorkShift, WorkerCategory, Equipment, Activity } from "../types/rdo-visualization"

export const formatDate = (dateString: string): string => {
  return dateString
}

export const getClimateIcon = (climate: string): string => {
  const icons = {
    Ensolarado: "☀️",
    "Parcialmente nublado": "⛅",
    "Nublado/Claro": "☁️",
    Chuvoso: "🌧️",
    Tempestade: "⛈️",
  }
  return icons[climate as keyof typeof icons] || "☁️"
}

export const downloadPDF = (rdo: RDO): void => {
  console.log(`Downloading PDF for RDO #${rdo.number}`)
  // Simulate PDF download
  const link = document.createElement("a")
  link.href = rdo.pdfUrl || "#"
  link.download = `RDO-${rdo.number}-${rdo.date.replace(/\//g, "-")}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadMultiplePDFs = (rdos: RDO[]): void => {
  console.log(`Downloading ${rdos.length} PDFs`)
  rdos.forEach((rdo, index) => {
    setTimeout(() => {
      downloadPDF(rdo)
    }, index * 500) // Stagger downloads by 500ms
  })
}

export const viewRDO = (rdo: RDO): void => {
  console.log(`Viewing RDO #${rdo.number}`)
  // Simulate opening RDO viewer
  alert(`Abrindo visualização do RDO #${rdo.number}`)
}

export const generateDetailedRDO = (baseRdo: RDO): DetailedRDO => {
  // Gerar dados baseados no RDO básico
  const rdoNumber = Number.parseInt(baseRdo.number)

  // Dados padrão que variam baseado no número do RDO
  const baseWorkers = (Math.floor(rdoNumber / 10) % 5) + 3 // Entre 3-7 trabalhadores
  const hasEquipment = rdoNumber % 3 === 0 // A cada 3 RDOs tem equipamento

  const defaultShifts: WorkShift[] = [
    {
      period: "Manhã",
      entry: "07:30",
      exit: "12:00",
      workedHours: "04:30",
      weather: baseRdo.climate as any,
      conditions: "Praticável",
      efficiency: "100%",
    },
    {
      period: "Tarde",
      entry: "13:00",
      exit: "16:40",
      workedHours: "03:40",
      weather: baseRdo.climate as any,
      conditions: "Praticável",
      efficiency: "100%",
    },
    {
      period: "Noite",
      entry: "",
      exit: "",
      workedHours: "00:00",
      weather: baseRdo.climate as any,
      conditions: "Praticável",
      efficiency: "",
    },
  ]

  const defaultWorkers: WorkerCategory[] = [
    { type: "Ajudante", direct: Math.floor(baseWorkers / 2), indirect: 0 },
    { type: "Pintor", direct: rdoNumber % 4 === 0 ? 2 : 0, indirect: 0 },
    { type: "Pedreiro", direct: Math.floor(baseWorkers / 3), indirect: 0 },
    { type: "Servente", direct: rdoNumber % 3 === 0 ? 1 : 0, indirect: 0 },
    { type: "Eletricista", direct: rdoNumber % 5 === 0 ? 1 : 0, indirect: 0 },
    { type: "Encanador", direct: 0, indirect: 0 },
    { type: "Carpinteiro", direct: rdoNumber % 6 === 0 ? 1 : 0, indirect: 0 },
    { type: "Ferreiro", direct: 0, indirect: 0 },
    { type: "Motorista", direct: hasEquipment ? 1 : 0, indirect: 0 },
    { type: "Topógrafo", direct: 0, indirect: 0 },
    { type: "Engenheiro", direct: 0, indirect: 0 },
    { type: "Resp. Tec.", direct: 1, indirect: 0 },
    { type: "Adm.", direct: 1, indirect: 0 },
    { type: "Encarregado", direct: 0, indirect: 0 },
    { type: "Almoxarife", direct: 0, indirect: 0 },
    { type: "Estagiário", direct: 0, indirect: 0 },
    { type: "Auxiliar", direct: 0, indirect: 0 },
    { type: "Técnico", direct: 0, indirect: 0 },
    { type: "Arquiteto", direct: 0, indirect: 0 },
  ]

  const defaultEquipment: Equipment[] = [
    { name: "Retroescavadeira", quantity: hasEquipment && rdoNumber % 7 === 0 ? 1 : 0 },
    { name: "Bobcat", quantity: 0 },
    { name: "Escantilhão", quantity: rdoNumber % 4 === 0 ? 2 : 0 },
    { name: "Compactador", quantity: 0 },
    { name: "Caçamba", quantity: hasEquipment ? 1 : 0 },
    { name: "Rompedor", quantity: 0 },
    { name: "Andaime", quantity: rdoNumber % 3 === 0 ? 3 : 0 },
    { name: "Escora Met.", quantity: 0 },
    { name: "Container", quantity: rdoNumber % 8 === 0 ? 1 : 0 },
    { name: "Vibrador", quantity: rdoNumber % 5 === 0 ? 2 : 0 },
    { name: "Furadeira", quantity: 0 },
    { name: "Perfuratriz", quantity: 0 },
    { name: "Bomba Concreto", quantity: rdoNumber % 10 === 0 ? 1 : 0 },
    { name: "Camin. Betoneira", quantity: rdoNumber % 6 === 0 ? 1 : 0 },
    { name: "Camin. Basculante", quantity: 0 },
    { name: "Betoneira", quantity: rdoNumber % 4 === 0 ? 1 : 0 },
  ]

  const activities: Activity[] = [
    {
      description: baseRdo.description,
      status: rdoNumber % 2 === 0 ? "Em andamento" : "Concluído",
    },
  ]

  // Adicionar atividades extras baseado no tipo de trabalho
  if (baseRdo.description.toLowerCase().includes("estrutura")) {
    activities.push({
      description: "Montagem de armaduras",
      status: "Concluído",
    })
  }
  if (baseRdo.description.toLowerCase().includes("alvenaria")) {
    activities.push({
      description: "Assentamento de blocos",
      status: "Em andamento",
    })
  }

  return {
    ...baseRdo,
    companyName: "CONSTRUTORA AVANT GARDE",
    companyCode: "427.853.308-03",
    contractNumber: "Torre 1 Sala 420 - Rua Bragança Paulista - SP",
    workLocation: "Rua Piacenza, nº 272, Quadra C Lote 11, Residencial San Vitale, Bragança Paulista - SP",
    client: "ANDRESSA MENDES GONÇALVES DIAS",
    workStart: "11/11/2024",
    workEnd: "10/11/2025",
    decoratedDeadline: `${rdoNumber} / 365`,
    reportDate: baseRdo.date,
    weekDay: getWeekDay(baseRdo.date),
    shifts: defaultShifts,
    workers: defaultWorkers,
    equipment: defaultEquipment,
    activities,
    occurrences: rdoNumber % 7 === 0 ? "Chuva no período da tarde, trabalhos suspensos temporariamente." : "",
    fiscalVisit: rdoNumber % 5 === 0,
    generalComments: `Dia útil - ${baseRdo.description}. Trabalhos executados conforme cronograma.`,
    responsibleEngineer: {
      name: "Renan Mazuchelli Fernandes",
      registration: "CAU A1746081",
    },
    fiscalEngineer: {
      name: "Eleandro Fernando de Campos",
      registration: "CPF 296.357.708-71",
    },
  }
}

const getWeekDay = (dateString: string): string => {
  const [day, month, year] = dateString.split("/").map(Number)
  const date = new Date(year, month - 1, day)
  const weekDays = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]
  return weekDays[date.getDay()]
}
