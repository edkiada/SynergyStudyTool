const logger = require('./utils/logger')
const userService = require('./services/userService')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer', '')
  }
  return null
}

const requestLogger = (req, res, next) => {
  logger.info('Method', req.method)
  logger.info('Path', req.path)
  logger.info('Body', req.body)
  logger.info('---')

  next()
}

const unknowEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint' })
}

const userExtractor = async (req, res, next) => {
  try {
    const token = getTokenFrom(req)
    const user = await userService.verifyToken(token)
    req.user = user
    req.userId = user.id
  } catch(error) {
    next(error)
  }
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.massage)

  if (error.name === 'CastError') {
    return res.status(400).json({ status: 'error', message: 'ID 格式不正確' });
  }

  if(error.name === 'TokenMissing') {
    return res.status(400).json({code: error.message, error: 'Token缺失'})
  }
  if(error.name === 'TokenInvalid') {
    return res.status(401).json({code: error.message, error: 'Token驗證失敗'})
  }
  if(error.name === 'userNotFind') {
    return res.status(404).json({code: error.message, error: '用戶不存在'})
  }
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(el => el.message);
    return res.status(400).json({ status: 'error', message: `資料驗證失敗: ${messages.join(', ')}` });
  }

  res.status(error.status || 500).json({
    status: 'error',
    message: error.message || '伺服器內部發生錯誤'
  });
}

module.exports = {
  requestLogger,
  unknowEndpoint,
  errorHandler,
  userExtractor
}