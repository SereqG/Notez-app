import { MainButton } from './MainButton'

interface props {
  buttons: { text: string; onClick?: () => void }[]
}

export function ButtonsSection({ buttons }: props) {
  return (
    <section className="absolute bottom-5 right-5 flex gap-2 lg:relative lg:bottom-0 lg:right-0">
      {buttons.map((el) => (
        <MainButton onClick={el.onClick} key={el.text}>
          {el.text}
        </MainButton>
      ))}
    </section>
  )
}
