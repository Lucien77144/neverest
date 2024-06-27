<template>
  <div ref="alternativeEndRef" class="alternative-end">
    <div class="alternative-end__wrapper">
      <div ref="alternativeEndEndRef" class="alternative-end__end">
        <div
          class="alternative-end__end__close"
          @click="$bus.emit('alternativeEnd:hideEnd'), $bus.emit('audio:click')"
        >
          <img
            class="alternative-end__end__close__icon"
            src="/assets/img/cross.svg"
            alt="close"
          />
          <p class="alternative-end__end__close__text">
            {{ $t('CLOSE') }}
          </p>
        </div>
        <div class="alternative-end__assos">
          <div class="alternative-end__assos__items">
            <a
              href="https://everestsummiteersassociation.org/"
              target="_blank"
              rel="noopener"
              ><img src="/assets/img/ESA.png" alt="" />Everest summiters
              association</a
            >
            <a href="https://spcc.org.np/" target="_blank" rel="noopener"
              ><img src="/assets/img/SPCC.png" alt="" />Sagarmatha Pollution
              Control Committee</a
            >
            <a
              href="https://www.mteverestbiogasproject.org/"
              target="_blank"
              rel="noopener"
              ><img src="/assets/img/BiogasProject.png" alt="" />Mount Everest
              Biogas Project</a
            >
          </div>
          <div class="alternative-end__assos__items">
            <a
              href="https://www.sherpafoundation.org/"
              target="_blank"
              rel="noopener"
              ><img src="/assets/img/SF.png" alt="" />Sherpa Foundation</a
            >
            <a
              href="https://globalconservation.org/"
              target="_blank"
              rel="noopener"
              ><img src="/assets/img/GC.png" alt="" />Global Conservation</a
            >
          </div>
        </div>
        <UIText style="max-width: 80ch; bottom: 4rem"
          >L’Everest n’est qu’un exemple parmi les désastres causé par le
          tourisme de masse.<br />En soutenant ces organismes, nous avons
          l'opportunité de changer les choses.</UIText
        >
      </div>
      <h1 class="alternative-end__date">2050</h1>
      <div ref="creditsRef" class="credits">
        <UIBtn :secondary="true">
          Crédits
        </UIBtn>
      </div>
      <div
        ref="modalPlayerRef"
        class="modal-player"
        @click="$bus.emit('alternativeEnd:showEnd'), $bus.emit('audio:click')"
      >
        <div class="modal-player__container">
          <client-only>
            <Vue3Lottie
              ref="lottieRef"
              :animationData="modalAnimation"
              :autoPlay="true"
              :loop="true"
            />
          </client-only>
        </div>
      </div>
      <div
        class="alternative-end__close"
        @click="
          $bus.emit('alternativeEnd:hide'),
            $bus.emit('audio:click'),
            $bus.emit('audio:2050')
        "
      >
        <img
          class="alternative-end__close__icon"
          src="/assets/img/back.svg"
          alt="close"
        />
        <p class="alternative-end__close__text">
          {{ $t('CLOSE') }}
        </p>
      </div>
      <div ref="textRef1" style="top: 10rem; right: 35rem" class="text">
        <UIText>Toutefois, il existe un second futur envisageable.</UIText>
      </div>
      <div ref="textRef2" style="bottom: 15rem; left: 6em" class="text">
        <UIText>2050 arrive vite mais il est encore temps d’agir!</UIText>
      </div>
      <img
        class="alternative-end__scene"
        src="/assets/img/alternativeEnd.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { Vue3Lottie } from 'vue3-lottie'
import modalAnimation from '~/assets/data/modalAnim.json'

// Bus
const { $bus }: any = useNuxtApp()

// Refs
const alternativeEndRef = ref<HTMLElement>()
const alternativeEndEndRef = ref<HTMLElement>()
const textRef1 = ref<HTMLElement>()
const textRef2 = ref<HTMLElement>()
const creditsRef = ref<HTMLElement>()
const modalPlayerRef = ref<HTMLElement>()

$bus.on('alternativeEnd:show', () => {
  if (
    !textRef1.value ||
    !textRef2.value ||
    !alternativeEndRef.value ||
    !creditsRef.value ||
    !modalPlayerRef.value
  )
    return
  gsap.to(alternativeEndRef.value, {
    height: '100%',
    duration: 1,
    ease: 'power2.inOut',
  })
  gsap.to(textRef1.value, {
    opacity: 1,
    delay: 1,
    duration: 0.5,
    ease: 'power2.inOut',
  })
  gsap.to(textRef2.value, {
    opacity: 1,
    delay: 1.5,
    duration: 0.5,
    ease: 'power2.inOut',
  })
  gsap.to(creditsRef.value, {
    opacity: 1,
    delay: 0.5,
    duration: 0.5,
    ease: 'power2.inOut',
  })
  gsap.to(modalPlayerRef.value, {
    opacity: 1,
    delay: 1.5,
    duration: 0.5,
    ease: 'power2.inOut',
  })
})

$bus.on('alternativeEnd:hide', () => {
  if (
    !textRef1.value ||
    !textRef2.value ||
    !alternativeEndRef.value ||
    !creditsRef.value ||
    !modalPlayerRef.value
  )
    return
  gsap.to(textRef2.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.inOut',
  })
  gsap.to(modalPlayerRef.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.Out',
  })
  gsap.to(textRef1.value, {
    opacity: 0,
    delay: 0.3,
    duration: 0.3,
    ease: 'power2.inOut',
  })
  gsap.to(alternativeEndRef.value, {
    height: 0,
    duration: 1,
    ease: 'power2.inOut',
  })
  gsap.to(creditsRef.value, {
    opacity: 0,
    duration: 0.3,
    delay: 0.5,
    ease: 'power2.inOut',
  })
})

$bus.on('alternativeEnd:showEnd', () => {
  if (!alternativeEndEndRef.value) return
  gsap.to(alternativeEndEndRef.value, {
    opacity: 1,
    visibility: 'visible',
    duration: 0.5,
    ease: 'power2.inOut',
  })
})
$bus.on('alternativeEnd:hideEnd', () => {
  if (!alternativeEndEndRef.value) return
  gsap.to(alternativeEndEndRef.value, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      if (!alternativeEndEndRef.value) return
      gsap.to(alternativeEndEndRef.value, {
        visibility: 'hidden',
        duration: 0,
      })
    },
  })
})
</script>

<style src="./style.scss" lang="scss" scoped></style>
