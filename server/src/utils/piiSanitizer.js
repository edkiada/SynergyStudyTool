// utils/piiSanitizer.js

/**
 * 敏感資訊正則庫 (Regular Expression Library)
 */
const PII_PATTERNS = {
  // --- 高危險系統憑證與金鑰 ---
  // OpenAI API Key 
  OPENAI_KEY: /sk-[a-zA-Z0-9-_]{20,}/g, 
  // GitHub Personal Access Token
  GITHUB_TOKEN: /gh[pousr]_[a-zA-Z0-9]{36}/g,  
  // AWS Access Key ID
  AWS_KEY: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/g,
  // 通用HTTP Bearer Token
  BEARER_TOKEN: /Bearer\s+[a-zA-Z0-9_\-\.]{20,}/gi,
  // --- 個人隱私資訊 ---
  // 身分證字號
  TW_ID: /\b[A-Z][12]\d{8}\b/gi,
  // 手機號碼
  PHONE_TW: /(?:\+?886\-?|0)9\d{2}[-\s]?\d{3}[-\s]?\d{3}/g,
  // 電子郵件
  EMAIL: /[a-zA-Z0-9._%+-]+(?:\s*@\s*|\s*\[at\]\s*)[a-zA-Z0-9.-]+(?:\s*\.\s*|\s*\[dot\]\s*)[a-zA-Z]{2,}/gi
}
//全形轉半形
const normalizeFullWidth = (text) => {
  if (typeof text !== 'string') return ''
  return text.replace(/[\uFF01-\uFF5E]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
  )
}
const sanitizePiiText = (text) => {
  if (!text || typeof text !== 'string') return ''

  let sanitized = normalizeFullWidth(text)

  sanitized = sanitized
    .replace(PII_PATTERNS.OPENAI_KEY, '[REDACTED_API_KEY]')
    .replace(PII_PATTERNS.GITHUB_TOKEN, '[REDACTED_GITHUB_TOKEN]')
    .replace(PII_PATTERNS.AWS_KEY, '[REDACTED_AWS_KEY]')
    .replace(PII_PATTERNS.BEARER_TOKEN, '[REDACTED_TOKEN]')

  sanitized = sanitized
    .replace(PII_PATTERNS.TW_ID, '[REDACTED_NATIONAL_ID]')
    .replace(PII_PATTERNS.PHONE_TW, '[REDACTED_PHONE]')
    .replace(PII_PATTERNS.EMAIL, '[REDACTED_EMAIL]')

  return sanitized
}

module.exports = {
  sanitizePiiText,
  normalizeFullWidth,
  PII_PATTERNS
}