import { api } from "@/API/config"
import { exportResponse } from "@/types/API"

export default function Datafunctions() {
  return {
    exportData: () => exportData(),
    importData: (file) => importData(file)
  }
}

const exportData = async () => {
  const response = await api.get<exportResponse>('http://localhost:3000/login/export')
  const blob = await JSON.stringify(response.data).toString()
  const url = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'data.txt')
  document.body.appendChild(link)
  link.click()
}

const importData = async ({ file }: any) => {
  const document = file.files[0]
  if (!document) {
    alert('Error al seleccionar el archivo')
    return
  }

  const formData = new FormData()
  formData.append("file", document)

  try {
    const response = await api.post('http://localhost:3000/login/import', formData, {
      headers: {
        "Content-Type": 'multipart/form-data'//document.type
      }
    })
    return response
  } catch (error) {
    console.error('Error subiendo el archivo', error)
    alert('Error al subir archivo')
  }
}