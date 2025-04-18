'use client'

import { StatusCard } from './StatusCard'
import { RegistrationCard } from './RegistrationCard'
import { PostDetailsCard } from './PostDetailsCard'
import { PlanCard } from './PlanCard'

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <StatusCard />
      <RegistrationCard />
      <PostDetailsCard 
        maxListings={5} 
        currentListings={2} 
        archivedListings={1} 
      />
      <PlanCard 
        currentPlan="plan_business" 
        maxListings={5} 
      />
    </div>
  )
}
