import { Container, Link } from './Footer.styles'

export default function Footer() {
  return (
    <Container>
      <Link
        as="a"
        href={'https://github.com/henriquemorikawa/Heycar'}
        target="_blank"
      >
        Terms&amp;Conditions | Privacy policy
      </Link>
    </Container>
  )
}
