import Image from 'next/image'
import { Icons, SidebarIcons } from './Sidebar.styles'

export default function SideBar() {
  return (
    <SidebarIcons>
      <Icons>
        <Image
          src="/images/Layer-7.svg"
          alt="column graph icon"
          width={24}
          height={24}
        />
      </Icons>
      <Icons>
        <Image
          src="/images/Layer-3.svg"
          alt="4 square icons"
          width={24}
          height={24}
        />
      </Icons>
      <Icons>
        <Image
          src="/images/Layer-4.svg"
          alt="desktop icon"
          width={24}
          height={24}
        />
      </Icons>
      <Icons>
        <Image
          src="/images/Layer-1.svg"
          alt="pie chart icon"
          width={24}
          height={24}
        />
      </Icons>
      <Icons>
        <Image
          src="/images/Layer-6.svg"
          alt="power button icon"
          width={24}
          height={24}
        />
      </Icons>
    </SidebarIcons>
  )
}
