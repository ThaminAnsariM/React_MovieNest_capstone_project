import React from 'react'

function AdminTitle({text1,text2}) {
  return (
    <div>

        <h1 className='font-medium text-2xl'>
            {text1} <span className='text-orange-400'>{text2}</span>
        </h1>
      
    </div>
  )
}

export default AdminTitle
