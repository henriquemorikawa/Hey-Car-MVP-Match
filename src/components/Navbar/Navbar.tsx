import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Logo, Menu, Nav, User, UserInitials, Wrapper } from './Navbar.styles'

export default function Navbar() {
  const [user, setUser] = useState<string>('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(
          'http://178.63.13.157:8090/mock-api/api/users'
        )
        setUser(
          `${result.data.data[0].firstName} ${result.data.data[0].lastName}`
        )
        return
      } catch (error) {
        console.error(error)
      }
    }
    getUser()
  }, [])

  const firstNameInitial = user.split(' ')[0]?.charAt(0)
  const lastNameInitial = user.split(' ')[1]?.charAt(0)

  return (
    <Nav>
      <Wrapper>
        <Logo>
          <Image
            src="/images/b-color.svg"
            alt="blue letter B logo"
            width="26.67"
            height="40"
          />
        </Logo>
        <Menu>
          <Image
            src="/images/Group.svg"
            alt="side menu toggle"
            width="30.86"
            height="27"
          />
        </Menu>
      </Wrapper>
      <Wrapper>
        <UserInitials>{firstNameInitial + lastNameInitial}</UserInitials>
        <User>{user}</User>
      </Wrapper>
    </Nav>
  )
}
