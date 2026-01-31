import React from 'react'

const ChatWidget = () => {
    const phoneNumber = "51992107290"
    const message = "Hola, quisiera más información sobre sus servicios veterinarios."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
            aria-label="Chat on WhatsApp"
            style={{ zIndex: 9999 }}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-10 h-10"
            />
        </a>
    )
}

export default ChatWidget
