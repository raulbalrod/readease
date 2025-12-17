import { Button } from "../Button/ActionButton"

interface PremiumMessageProps {
  isOpen: boolean
  onClose: () => void
  type: 'ebook' | 'audiobook'
}

export const PremiumMessage = ({ isOpen, onClose, type }: PremiumMessageProps) => {
  if (!isOpen) return null

  const content = {
    ebook: "Accede a miles de libros digitales",
    audiobook: "Disfruta de narración profesional"
  }

  return (
    <div className="fixed inset-0 bg-primary/80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bx bx-crown text-white text-2xl"></i>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Funcionalidad Premium
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {content[type]}. Actualiza tu plan para disfrutar de todo el contenido.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = '/subscription'}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3"
            >
              Ver Planes Premium
            </Button>
            <button 
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium"
            >
              Ahora no
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}