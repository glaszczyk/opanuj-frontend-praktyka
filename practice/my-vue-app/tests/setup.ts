import { config } from '@vue/test-utils'
import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// Global settings for Vue Testing Library
config.global.renderStubDefaultSlot = true
