import React from 'react'
import { MoreVertical, Ticket, BadgePercent, Users, ShoppingCart, Pencil, Trash2 } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  


const TicketCard = () => {
  return (
    <div className='border border-gray-300 rounded-lg'>
        <div className='py-5 px-4 border-b border-gray-300 flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <div className="p-3 rounded-full bg-purple-100 rotate-45"><Ticket color="#984ab5" /></div>
                <div>
                    <p className='text-sm font-medium'>Ticket Name - $10.00</p>
                    <p className='text-xs text-gray-600'>May 3, 2022</p>
                </div>
            </div>
            <div className='flex gap-3 items-center'>
            <BadgePercent />
            <Switch />
            <Popover>
  <PopoverTrigger><div className='border border-gray-300 p-1 rounded-sm cursor-pointer'>
                <MoreVertical />
            </div></PopoverTrigger>
  <PopoverContent className='p-0 w-[100px] text-sm text-gray-500'>
    <p className='p-2 flex gap-3 items-center hover:bg-slate-200 cursor-pointer'><Pencil className='w-4 h-4' /> Edit</p>
    <p className='p-2 flex gap-3 items-center hover:bg-slate-200 cursor-pointer'><Trash2 className='w-4 h-4'/> Delete</p>
  </PopoverContent>
</Popover>
            
            
            </div>
        </div>
        <div className='py-5 px-4 grid grid-cols-3'>
            <div className='flex gap-3 items-center'>
                <div className="p-2 rounded-full bg-gray-100"><Ticket className='w-4 h-4 text-gray-500' /></div>
                <div>
                    <p className='text-xs text-gray-500'>Total tickets</p>
                    <p className='text-xs text-gray-700 font-semibold'>Unlimited</p>
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <div className="p-2 rounded-full bg-gray-100"><Users className='w-4 h-4 text-gray-500' /></div>
                <div>
                    <p className='text-xs text-gray-500'>Ticket limit per customer</p>
                    <p className='text-xs text-gray-700 font-semibold'>Unlimited</p>
                </div>
            </div>
            <div className='flex gap-3 items-center'>
                <div className="p-2 rounded-full bg-gray-100"><ShoppingCart className='w-4 h-4 text-gray-500' /></div>
                <div>
                    <p className='text-xs text-gray-500'>Discount</p>
                    <p className='text-xs text-gray-700 font-semibold'>2%</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TicketCard