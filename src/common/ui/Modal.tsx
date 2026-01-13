import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@mui/material'

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    cancelText?: string;
    submitText?: string;
    onSubmit?: () => void;
    showButtons?: boolean;
    disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
    open, 
    onClose, 
    children, 
    title, 
    description, 
    cancelText = 'Cancel', 
    submitText = 'Submit', 
    onSubmit,
    showButtons = true,
    disabled = false
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60" onClick={onClose}>
            <div className="relative w-full md:w-lg bg-white shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] rounded-t-[10px] md:rounded-[10px] outline outline-[rgba(0,0,0,0.10)] -outline-offset-1 max-h-[90vh] overflow-y-auto md:mx-0 mb-4 md:mb-0" onClick={(e) => e.stopPropagation()}>
                <div className="md:hidden flex justify-center pt-3 pb-1">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
                
                <button onClick={onClose} className="absolute top-4 right-4 opacity-70 p-1 rounded hover:bg-gray-100 z-10">
                    <X size={16} />
                </button>
                
                <div className="px-6 pb-6 pt-2 md:pt-6">
                    {(title || description) && (
                        <div className="mb-4">
                            {title && <div className="text-xl font-semibold mb-1">{title}</div>}
                            {description && <div className="text-sm text-[#717182] mb-3">{description}</div>}
                        </div>
                    )}
                    
                    <div className="mb-4">
                        {children}
                    </div>
                    
                    {showButtons && (
                        <div className="flex justify-end gap-6 mt-6">
                            <Button variant="text" onClick={onClose} className='text-subtext! px-4!'>
                                {cancelText}
                            </Button>
                            <Button variant="contained" onClick={onSubmit || onClose} disabled={disabled}>
                                {submitText}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal