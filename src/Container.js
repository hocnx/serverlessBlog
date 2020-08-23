import React from 'react'

export default function Container({children}) {
    return (
        <div style={containerStyle}>
            {children}
        </div>
    )
}

const containerStyle  = {
    padding: '30px 40px',
    minHeight: 'calc(100vh - 120px)'
}