import React from 'react'

type UserInfo = {
  name: string,
  age: number,
}

export const RootSchema = ({ name, age }: UserInfo) => {
  return (
    <div className="App">
      <p>{ name }</p>
      <p>{ age }</p>
    </div>
  )
}
export default RootSchema;