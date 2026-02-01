import * as XLSX from 'xlsx'

export const exportLeadsToExcel = (leads) => {
  const formatted = leads.map(l => ({
    Name: l.name,
    Phone: l.phone,
    Email: l.email,
    Property: l.property || '',
    Date: new Date(l.created_at).toLocaleString()
  }))

  const worksheet = XLSX.utils.json_to_sheet(formatted)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads')

  XLSX.writeFile(workbook, 'leads.xlsx')
}
