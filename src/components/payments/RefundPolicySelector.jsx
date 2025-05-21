import React from 'react'
import { FaShieldAlt, FaCheck } from 'react-icons/fa'

function RefundPolicySelector({ policies, selectedPolicy, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <FaShieldAlt className="text-primary-500 mr-3" size={24} />
        <h2 className="text-xl font-semibold">Refund Policy</h2>
      </div>

      <div className="space-y-4">
        {policies.map(policy => (
          <button
            key={policy.id}
            onClick={() => onSelect(policy)}
            className={`w-full p-4 border rounded-lg text-left transition-colors ${
              selectedPolicy?.id === policy.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{policy.name}</h3>
              {selectedPolicy?.id === policy.id && (
                <FaCheck className="text-primary-500" />
              )}
            </div>
            <p className="text-sm text-neutral-600 mb-2">{policy.description}</p>
            <div className="text-xs text-neutral-500">
              Cancellation deadline: {policy.cancellation_deadline_hours} hours before check-in
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RefundPolicySelector