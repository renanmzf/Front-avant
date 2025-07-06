"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { ContractDetailsModal } from "./contract-details-modal"
import { ContractsOverview } from "./contracts-overview"
import { useContracts } from "../hooks/use-contracts"
import { getProjectCardColor } from "../utils/contracts-utils"
import type { Contract } from "../types/contracts"

export default function ContractsScreen() {
  const {
    projects,
    selectedContract,
    setSelectedContract,
    totalProjects,
    totalContracts,
    totalValue,
    contractsByStatus,
    overduePayments,
  } = useContracts()

  const [selectedProjectContracts, setSelectedProjectContracts] = useState<Contract[]>([])
  const [showProjectContracts, setShowProjectContracts] = useState(false)

  const handleProjectClick = (projectContracts: Contract[]) => {
    if (projectContracts.length === 1) {
      setSelectedContract(projectContracts[0])
    } else {
      setSelectedProjectContracts(projectContracts)
      setShowProjectContracts(true)
    }
  }

  const handleContractClick = (contract: Contract) => {
    setSelectedContract(contract)
    setShowProjectContracts(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-2 max-w-7xl">
     
      <ContractsOverview
        totalProjects={totalProjects}
        totalContracts={totalContracts}
        totalValue={totalValue}
        contractsByStatus={contractsByStatus}
        overduePayments={overduePayments}
      />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Contratos por Projeto</h2>
          <span className="text-sm text-gray-600">{totalProjects} projetos</span>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            colorClass={getProjectCardColor(index)}
            onClick={() => handleProjectClick(project.contracts)}
          />
        ))}
      </div>

      {/* Project Contracts Modal */}
      {showProjectContracts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Selecione um Contrato</h3>
              <button onClick={() => setShowProjectContracts(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {selectedProjectContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => handleContractClick(contract)}
                >
                  <h4 className="font-medium">{contract.title}</h4>
                  <p className="text-sm text-gray-600">{contract.scope.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contract Details Modal */}
      {selectedContract && (
        <ContractDetailsModal contract={selectedContract} onClose={() => setSelectedContract(null)} />
      )}
    </div>
  )
}
