import { MainButton } from '../ui/buttons/MainButton'

export function ButtonsSection() {
  return (
    <section className="absolute bottom-5 right-5 flex gap-2 lg:relative lg:bottom-0 lg:right-0">
      <MainButton>New group</MainButton>
    </section>
  )
}
