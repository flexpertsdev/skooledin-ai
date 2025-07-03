import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'

// Gesture types
export type GestureType = 'swipe' | 'pinch' | 'rotate' | 'pan' | 'tap' | 'doubletap' | 'longpress'
export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
export type GestureState = 'start' | 'move' | 'end' | 'cancel'

// Gesture event data
export interface GestureEvent {
  type: GestureType
  state: GestureState
  timestamp: number
  deltaX: number
  deltaY: number
  distance: number
  angle: number
  velocity: number
  scale?: number
  rotation?: number
  direction?: SwipeDirection
  touches: number
}

// Gesture options
export interface GestureOptions {
  // Swipe
  swipeThreshold?: number
  swipeVelocity?: number
  
  // Pinch
  pinchThreshold?: number
  
  // Rotate
  rotateThreshold?: number
  
  // Tap
  tapThreshold?: number
  tapTimeout?: number
  doubleTapTimeout?: number
  longPressTimeout?: number
  
  // General
  preventDefault?: boolean
  stopPropagation?: boolean
  passive?: boolean
  capture?: boolean
}

// Touch point data
interface TouchPoint {
  id: number
  x: number
  y: number
  timestamp: number
}

// Default options
const defaultOptions: GestureOptions = {
  swipeThreshold: 50,
  swipeVelocity: 0.3,
  pinchThreshold: 0.1,
  rotateThreshold: 15,
  tapThreshold: 10,
  tapTimeout: 250,
  doubleTapTimeout: 300,
  longPressTimeout: 500,
  preventDefault: true,
  stopPropagation: false,
  passive: false,
  capture: false
}

export const useGesture = (
  target: Ref<HTMLElement | undefined> | HTMLElement,
  options: GestureOptions = {}
) => {
  // Merge options
  const opts = { ...defaultOptions, ...options }
  
  // State
  const isActive = ref(false)
  const currentGesture = ref<GestureType | null>(null)
  const touchPoints = ref<Map<number, TouchPoint>>(new Map())
  const startTime = ref(0)
  const lastTapTime = ref(0)
  const longPressTimer = ref<NodeJS.Timeout | null>(null)
  
  // Initial values for gesture calculation
  const initialDistance = ref(0)
  const initialAngle = ref(0)
  const initialScale = ref(1)
  const initialRotation = ref(0)
  
  // Current values
  const currentX = ref(0)
  const currentY = ref(0)
  const deltaX = ref(0)
  const deltaY = ref(0)
  const velocity = ref(0)
  
  // Gesture callbacks
  const callbacks = {
    onSwipe: ref<((event: GestureEvent) => void) | null>(null),
    onPinch: ref<((event: GestureEvent) => void) | null>(null),
    onRotate: ref<((event: GestureEvent) => void) | null>(null),
    onPan: ref<((event: GestureEvent) => void) | null>(null),
    onTap: ref<((event: GestureEvent) => void) | null>(null),
    onDoubleTap: ref<((event: GestureEvent) => void) | null>(null),
    onLongPress: ref<((event: GestureEvent) => void) | null>(null),
    onGesture: ref<((event: GestureEvent) => void) | null>(null)
  }
  
  // Helper functions
  const getDistance = (p1: TouchPoint, p2: TouchPoint): number => {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    return Math.sqrt(dx * dx + dy * dy)
  }
  
  const getAngle = (p1: TouchPoint, p2: TouchPoint): number => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
  }
  
  const getSwipeDirection = (dx: number, dy: number): SwipeDirection => {
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    
    if (absDx > absDy) {
      return dx > 0 ? 'right' : 'left'
    } else {
      return dy > 0 ? 'down' : 'up'
    }
  }
  
  const createGestureEvent = (
    type: GestureType,
    state: GestureState,
    extra: Partial<GestureEvent> = {}
  ): GestureEvent => {
    return {
      type,
      state,
      timestamp: Date.now(),
      deltaX: deltaX.value,
      deltaY: deltaY.value,
      distance: Math.sqrt(deltaX.value ** 2 + deltaY.value ** 2),
      angle: Math.atan2(deltaY.value, deltaX.value) * 180 / Math.PI,
      velocity: velocity.value,
      touches: touchPoints.value.size,
      ...extra
    }
  }
  
  const emit = (event: GestureEvent) => {
    // Call specific gesture callback
    const callbackMap = {
      swipe: callbacks.onSwipe.value,
      pinch: callbacks.onPinch.value,
      rotate: callbacks.onRotate.value,
      pan: callbacks.onPan.value,
      tap: callbacks.onTap.value,
      doubletap: callbacks.onDoubleTap.value,
      longpress: callbacks.onLongPress.value
    }
    
    const callback = callbackMap[event.type]
    if (callback) {
      callback(event)
    }
    
    // Call general gesture callback
    if (callbacks.onGesture.value) {
      callbacks.onGesture.value(event)
    }
  }
  
  // Touch event handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (opts.preventDefault) e.preventDefault()
    if (opts.stopPropagation) e.stopPropagation()
    
    isActive.value = true
    startTime.value = Date.now()
    
    // Clear existing touches and add new ones
    touchPoints.value.clear()
    Array.from(e.touches).forEach(touch => {
      touchPoints.value.set(touch.identifier, {
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      })
    })
    
    // Single touch
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      currentX.value = touch.clientX
      currentY.value = touch.clientY
      deltaX.value = 0
      deltaY.value = 0
      
      // Start long press timer
      if (longPressTimer.value) {
        clearTimeout(longPressTimer.value)
      }
      
      longPressTimer.value = setTimeout(() => {
        if (isActive.value && touchPoints.value.size === 1) {
          currentGesture.value = 'longpress'
          emit(createGestureEvent('longpress', 'end'))
          isActive.value = false
        }
      }, opts.longPressTimeout)
    }
    
    // Multi-touch
    if (e.touches.length === 2) {
      const points = Array.from(touchPoints.value.values())
      initialDistance.value = getDistance(points[0], points[1])
      initialAngle.value = getAngle(points[0], points[1])
      initialScale.value = 1
      initialRotation.value = 0
    }
  }
  
  const handleTouchMove = useThrottleFn((e: TouchEvent) => {
    if (!isActive.value) return
    if (opts.preventDefault) e.preventDefault()
    
    // Clear long press timer on move
    if (longPressTimer.value) {
      clearTimeout(longPressTimer.value)
      longPressTimer.value = null
    }
    
    // Update touch points
    Array.from(e.touches).forEach(touch => {
      const point = touchPoints.value.get(touch.identifier)
      if (point) {
        point.x = touch.clientX
        point.y = touch.clientY
        point.timestamp = Date.now()
      }
    })
    
    // Single touch gestures
    if (e.touches.length === 1 && touchPoints.value.size === 1) {
      const touch = e.touches[0]
      const dx = touch.clientX - currentX.value
      const dy = touch.clientY - currentY.value
      
      deltaX.value += dx
      deltaY.value += dy
      
      // Calculate velocity
      const dt = Date.now() - startTime.value
      if (dt > 0) {
        const distance = Math.sqrt(deltaX.value ** 2 + deltaY.value ** 2)
        velocity.value = distance / dt
      }
      
      currentX.value = touch.clientX
      currentY.value = touch.clientY
      
      // Detect pan gesture
      if (!currentGesture.value && Math.abs(deltaX.value) > opts.tapThreshold || Math.abs(deltaY.value) > opts.tapThreshold) {
        currentGesture.value = 'pan'
        emit(createGestureEvent('pan', 'start'))
      } else if (currentGesture.value === 'pan') {
        emit(createGestureEvent('pan', 'move'))
      }
    }
    
    // Multi-touch gestures
    if (e.touches.length === 2 && touchPoints.value.size === 2) {
      const points = Array.from(touchPoints.value.values())
      const currentDistance = getDistance(points[0], points[1])
      const currentAngle = getAngle(points[0], points[1])
      
      // Calculate scale
      const scale = currentDistance / initialDistance.value
      
      // Calculate rotation
      let rotation = currentAngle - initialAngle.value
      if (rotation > 180) rotation -= 360
      if (rotation < -180) rotation += 360
      
      // Detect pinch gesture
      if (!currentGesture.value && Math.abs(scale - 1) > opts.pinchThreshold) {
        currentGesture.value = 'pinch'
        emit(createGestureEvent('pinch', 'start', { scale }))
      } else if (currentGesture.value === 'pinch') {
        emit(createGestureEvent('pinch', 'move', { scale }))
      }
      
      // Detect rotate gesture
      if (!currentGesture.value && Math.abs(rotation) > opts.rotateThreshold) {
        currentGesture.value = 'rotate'
        emit(createGestureEvent('rotate', 'start', { rotation }))
      } else if (currentGesture.value === 'rotate') {
        emit(createGestureEvent('rotate', 'move', { rotation }))
      }
    }
  }, 16) // ~60fps
  
  const handleTouchEnd = (e: TouchEvent) => {
    if (!isActive.value) return
    
    // Clear long press timer
    if (longPressTimer.value) {
      clearTimeout(longPressTimer.value)
      longPressTimer.value = null
    }
    
    const endTime = Date.now()
    const duration = endTime - startTime.value
    
    // Remove ended touches
    Array.from(e.changedTouches).forEach(touch => {
      touchPoints.value.delete(touch.identifier)
    })
    
    // End current gesture
    if (currentGesture.value) {
      if (currentGesture.value === 'pan') {
        // Check if it's a swipe
        const distance = Math.sqrt(deltaX.value ** 2 + deltaY.value ** 2)
        if (distance > opts.swipeThreshold && velocity.value > opts.swipeVelocity) {
          const direction = getSwipeDirection(deltaX.value, deltaY.value)
          emit(createGestureEvent('swipe', 'end', { direction }))
        } else {
          emit(createGestureEvent('pan', 'end'))
        }
      } else {
        emit(createGestureEvent(currentGesture.value, 'end'))
      }
    } else if (touchPoints.value.size === 0) {
      // Check for tap
      const tapDistance = Math.sqrt(deltaX.value ** 2 + deltaY.value ** 2)
      if (tapDistance < opts.tapThreshold && duration < opts.tapTimeout) {
        // Check for double tap
        if (endTime - lastTapTime.value < opts.doubleTapTimeout) {
          emit(createGestureEvent('doubletap', 'end'))
          lastTapTime.value = 0
        } else {
          emit(createGestureEvent('tap', 'end'))
          lastTapTime.value = endTime
        }
      }
    }
    
    // Reset state if no more touches
    if (touchPoints.value.size === 0) {
      isActive.value = false
      currentGesture.value = null
      deltaX.value = 0
      deltaY.value = 0
      velocity.value = 0
    }
  }
  
  const handleTouchCancel = () => {
    if (currentGesture.value) {
      emit(createGestureEvent(currentGesture.value, 'cancel'))
    }
    
    isActive.value = false
    currentGesture.value = null
    touchPoints.value.clear()
    
    if (longPressTimer.value) {
      clearTimeout(longPressTimer.value)
      longPressTimer.value = null
    }
  }
  
  // Mouse event support (for development)
  let mouseDown = false
  
  const handleMouseDown = (e: MouseEvent) => {
    mouseDown = true
    const fakeTouch = {
      identifier: 0,
      clientX: e.clientX,
      clientY: e.clientY,
      target: e.target
    }
    
    handleTouchStart({
      touches: [fakeTouch],
      changedTouches: [fakeTouch],
      preventDefault: () => e.preventDefault(),
      stopPropagation: () => e.stopPropagation()
    } as any)
  }
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseDown) return
    
    const fakeTouch = {
      identifier: 0,
      clientX: e.clientX,
      clientY: e.clientY,
      target: e.target
    }
    
    handleTouchMove({
      touches: [fakeTouch],
      changedTouches: [fakeTouch],
      preventDefault: () => e.preventDefault()
    } as any)
  }
  
  const handleMouseUp = (e: MouseEvent) => {
    if (!mouseDown) return
    mouseDown = false
    
    const fakeTouch = {
      identifier: 0,
      clientX: e.clientX,
      clientY: e.clientY,
      target: e.target
    }
    
    handleTouchEnd({
      touches: [],
      changedTouches: [fakeTouch]
    } as any)
  }
  
  // Setup event listeners
  const cleanup = ref<(() => void) | null>(null)
  
  const setup = () => {
    const element = (target as any).value || target
    if (!element) return
    
    const touchOptions = { passive: opts.passive, capture: opts.capture }
    const mouseOptions = { capture: opts.capture }
    
    // Touch events
    const removeTouchStart = useEventListener(element, 'touchstart', handleTouchStart, touchOptions)
    const removeTouchMove = useEventListener(element, 'touchmove', handleTouchMove as any, touchOptions)
    const removeTouchEnd = useEventListener(element, 'touchend', handleTouchEnd, touchOptions)
    const removeTouchCancel = useEventListener(element, 'touchcancel', handleTouchCancel, touchOptions)
    
    // Mouse events (for development)
    const removeMouseDown = useEventListener(element, 'mousedown', handleMouseDown, mouseOptions)
    const removeMouseMove = useEventListener(window, 'mousemove', handleMouseMove, mouseOptions)
    const removeMouseUp = useEventListener(window, 'mouseup', handleMouseUp, mouseOptions)
    
    cleanup.value = () => {
      removeTouchStart()
      removeTouchMove()
      removeTouchEnd()
      removeTouchCancel()
      removeMouseDown()
      removeMouseMove()
      removeMouseUp()
    }
  }
  
  // Lifecycle
  onMounted(() => {
    setup()
  })
  
  onUnmounted(() => {
    if (cleanup.value) {
      cleanup.value()
    }
    
    if (longPressTimer.value) {
      clearTimeout(longPressTimer.value)
    }
  })
  
  // Watch for target changes
  if ('value' in target) {
    watch(target as Ref<HTMLElement | undefined>, () => {
      if (cleanup.value) {
        cleanup.value()
      }
      setup()
    })
  }
  
  return {
    // State
    isActive: computed(() => isActive.value),
    currentGesture: computed(() => currentGesture.value),
    deltaX: computed(() => deltaX.value),
    deltaY: computed(() => deltaY.value),
    velocity: computed(() => velocity.value),
    
    // Methods
    on: <T extends GestureType>(
      type: T,
      callback: (event: GestureEvent) => void
    ) => {
      const callbackMap = {
        swipe: 'onSwipe',
        pinch: 'onPinch',
        rotate: 'onRotate',
        pan: 'onPan',
        tap: 'onTap',
        doubletap: 'onDoubleTap',
        longpress: 'onLongPress'
      } as const
      
      const callbackKey = callbackMap[type]
      if (callbackKey && callbackKey in callbacks) {
        (callbacks as any)[callbackKey].value = callback
      }
    },
    
    onGesture: (callback: (event: GestureEvent) => void) => {
      callbacks.onGesture.value = callback
    },
    
    off: <T extends GestureType>(type?: T) => {
      if (type) {
        const callbackMap = {
          swipe: 'onSwipe',
          pinch: 'onPinch',
          rotate: 'onRotate',
          pan: 'onPan',
          tap: 'onTap',
          doubletap: 'onDoubleTap',
          longpress: 'onLongPress'
        } as const
        
        const callbackKey = callbackMap[type]
        if (callbackKey && callbackKey in callbacks) {
          (callbacks as any)[callbackKey].value = null
        }
      } else {
        // Clear all callbacks
        Object.keys(callbacks).forEach(key => {
          (callbacks as any)[key].value = null
        })
      }
    }
  }
}