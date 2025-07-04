export default defineNuxtPlugin(() => {
  const responsive = useResponsive()

  return {
    provide: {
      mq: responsive.current,
      responsive
    }
  }
})
