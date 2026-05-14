'use client'

import React, { useState } from 'react'
import MobileModal from '@/common/ui/MobileModal'
import Button from '@/common/components/atoms/Button'
import ImageInput from '@/common/ui/ImageInput'
import CustomSelect from '@/common/ui/CustomSelect'
import { TICKET_TYPE_OPTIONS } from '../types'
import { useImageUrls } from '../hooks/useImageUrls'

interface RaiseTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (type: string, description: string, attachments?: string[]) => void
  isSubmitting?: boolean
}

export function RaiseTicketModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: RaiseTicketModalProps) {
    
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const { imageUrls, handleImagesChange, clearImages } = useImageUrls()

  const isValid = !!type && description.trim().length > 0

  const handleSubmit = () => {
    if (!isValid) return
    onSubmit(type, description.trim(), imageUrls.length > 0 ? imageUrls : undefined)
  }

  const handleClose = () => {
    setType('')
    setDescription('')
    clearImages()
    onClose()
  }

  return (
    <MobileModal isOpen={isOpen} onClose={handleClose} title="Raise a Support Ticket">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <CustomSelect
            value={type}
            onChange={setType}
            placeholder="Select issue type"
            options={TICKET_TYPE_OPTIONS}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tell us the problem</label>
          <textarea
            className="w-full border border-[#D9D9D9] rounded-2xl p-3 text-sm placeholder:text-[#9C9C9C] placeholder:italic outline-none resize-none min-h-[94px] font-normal"
            placeholder="Write your problem here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <ImageInput 
          text="Share us a screenshot of the issue" 
          onImagesChange={handleImagesChange}
          autoUpload={true}
        />

        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full py-3 px-4 bg-[#EEA0FF]! text-black! rounded-xl font-normal disabled:opacity-50 disabled:cursor-not-allowed"
          fullWidth
        >
          {isSubmitting ? 'Raising…' : 'Raise Ticket'}
        </Button>
      </div>
    </MobileModal>
  )
}
