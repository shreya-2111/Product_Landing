import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '../hooks/useIsMobile'

const stories = [
  {
    num: '01',
    title: 'Pure Sound\nImmersion',
    sub: 'Step into the studio',
    body: 'Custom 50mm neodymium drivers reproduce every frequency with studio-grade accuracy. Hear details in your music you never knew existed.',
    accent: '#7c3aed',
    bg: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)',
  },
  {
    num: '02',
    title: 'Intelligent\nNoise Cancel',
    sub: 'Silence on demand',
    body: 'Hybrid ANC with 6 microphones reads your environment 1000× per second. Commute, fly, or focus — the world disappears.',
    accent: '#06b6d4',
    bg: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.18) 0%, transparent 70%)',
  },
  {
    num: '03',
    title: 'Spatial Audio\nExperience',
    sub: 'Sound that moves with you',
    body: 'Head-tracked 3D audio places every instrument in three-dimensional space. Close your eyes — you\'re in the front row.',
    accent: '#a78bfa',
    bg: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(167,139,250,0.18) 0%, transparent 70%)',
  },
  {
    num: '04',
    title: 'Endless\nBattery Life',
    sub: 'Music that never stops',
    body: '40 hours of continuous playback. 5-minute fast charge gives you 3 more hours. AuralX Pro outlasts your longest days.',
    accent: '#34d399',
    bg: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(52,211,153,0.18) 0%, transparent 70%)',
  },
]

const ScrollStory = () => {
  const wrapperRef = useRef()
  const sceneRefs  = useRef([])
  const dotRefs    = useRef([])
  const bgRef      = useRef()
  const isMobile   = useIsMobile()

  useEffect(() => {
    // On mobile, skip the heavy sticky-pin + scrub setup entirely
    if (isMobile) return

    const wrapper = wrapperRef.current
    const scenes  = sceneRefs.current
    const dots    = dotRefs.current

    // Set all scenes invisible except first
    scenes.forEach((s, i) => {
      if (i > 0) gsap.set(s, { opacity: 0, y: 60 })
    })

    // Pin the sticky container
    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: '.story-sticky',
      pinSpacing: false,
    })

    // Transition each scene
    stories.forEach((story, i) => {
      if (i === stories.length - 1) return

      const progress = (i + 1) / stories.length

      // Fade out current
      gsap.to(scenes[i], {
        opacity: 0, y: -50,
        scrollTrigger: {
          trigger: wrapper,
          start: `${progress * 100 - 8}% top`,
          end:   `${progress * 100}% top`,
          scrub: 1,
        },
      })

      // Fade in next
      gsap.fromTo(scenes[i + 1],
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: `${progress * 100 - 5}% top`,
            end:   `${progress * 100 + 5}% top`,
            scrub: 1,
          },
        }
      )

      // Update dots
      ScrollTrigger.create({
        trigger: wrapper,
        start: `${progress * 100}% top`,
        onEnter: () => {
          dots.forEach((d, di) => {
            d.style.background = di <= i + 1 ? stories[i + 1].accent : 'rgba(255,255,255,0.15)'
            d.style.transform  = di === i + 1 ? 'scale(1.4)' : 'scale(1)'
          })
        },
        onLeaveBack: () => {
          dots.forEach((d, di) => {
            d.style.background = di <= i ? stories[i].accent : 'rgba(255,255,255,0.15)'
            d.style.transform  = di === i ? 'scale(1.4)' : 'scale(1)'
          })
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [isMobile])

  // Mobile: simple stacked cards — no sticky pinning, no scrub
  if (isMobile) {
    return (
      <section id="story" style={{ padding: '4rem 1.5rem', background: '#050816' }}>
        <div className="section-divider" style={{ marginBottom: '3rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '40rem', margin: '0 auto' }}>
          {stories.map((story, i) => (
            <div key={i} style={{
              padding: '2rem',
              borderRadius: '20px',
              background: story.bg,
              border: `1px solid ${story.accent}30`,
            }}>
              <div style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: story.accent,
                marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
              }}>
                <span>{story.num}</span>
                <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${story.accent}60, transparent)` }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 900,
                lineHeight: 1.05, letterSpacing: '-0.03em',
                color: '#fff', marginBottom: '0.75rem', whiteSpace: 'pre-line',
              }}>{story.title}</h2>
              <p style={{ fontSize: '0.95rem', color: story.accent, fontWeight: 500, marginBottom: '0.6rem' }}>{story.sub}</p>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7 }}>{story.body}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="story" ref={wrapperRef} style={{ position: 'relative', height: `${stories.length * 100}vh` }}>

      <div className="section-divider" />

      {/* Sticky viewport */}
      <div
        className="story-sticky"
        style={{
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', background: '#050816',
        }}
      >
        {/* Animated background blob */}
        <div ref={bgRef} style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: stories[0].bg, transition: 'background 1s ease',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Scenes */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          {stories.map((story, i) => (
            <div
              key={i}
              ref={el => sceneRefs.current[i] = el}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: i === 0 ? 'auto' : '50%',
                left: i === 0 ? 'auto' : '1.5rem',
                right: i === 0 ? 'auto' : '1.5rem',
                transform: i === 0 ? 'none' : 'translateY(-50%)',
              }}
            >
              <div style={{ maxWidth: '44rem' }}>
                {/* Number */}
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: story.accent,
                  marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span>{story.num}</span>
                  <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${story.accent}60, transparent)` }} />
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  marginBottom: '1.25rem',
                  whiteSpace: 'pre-line',
                }}>
                  {story.title}
                </h2>

                {/* Sub */}
                <p style={{ fontSize: '1.1rem', color: story.accent, fontWeight: 500, marginBottom: '1rem' }}>
                  {story.sub}
                </p>

                {/* Body */}
                <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.75, maxWidth: '36rem' }}>
                  {story.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div style={{
          position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 20,
        }}>
          {stories.map((s, i) => (
            <div
              key={i}
              ref={el => dotRefs.current[i] = el}
              style={{
                width: '6px', height: '6px', borderRadius: '99px',
                background: i === 0 ? s.accent : 'rgba(255,255,255,0.15)',
                transform: i === 0 ? 'scale(1.4)' : 'scale(1)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '6rem', pointerEvents: 'none',
          background: 'linear-gradient(to top, #050816, transparent)',
        }} />
      </div>
    </section>
  )
}

export default ScrollStory
