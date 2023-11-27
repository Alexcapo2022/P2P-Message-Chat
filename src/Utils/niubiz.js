export const URL_BASE = 'https://apisandbox.vnforappstest.com/'

export const URL_NIUBIZ = {
  acces_token: URL_BASE + 'api.security/v1/security',
  session_token: URL_BASE + `api.ecommerce/v2/ecommerce/token/session/${process.env.NIUBIZ_MERCHANT_ID}`,
}