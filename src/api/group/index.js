import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Group, { schema } from './model'

const router = new Router()
const { name, description, image, leader, assignments } = schema.tree

/**
 * @api {post} /groups Create group
 * @apiName CreateGroup
 * @apiGroup Group
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Group's name.
 * @apiParam description Group's description.
 * @apiParam image Group's image.
 * @apiParam leader Group's leader.
 * @apiParam assignments Group's assignments.
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, image, leader, assignments }),
  create)

/**
 * @api {get} /groups Retrieve groups
 * @apiName RetrieveGroups
 * @apiGroup Group
 * @apiUse listParams
 * @apiSuccess {Object[]} groups List of groups.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /groups/:id Retrieve group
 * @apiName RetrieveGroup
 * @apiGroup Group
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /groups/:id Update group
 * @apiName UpdateGroup
 * @apiGroup Group
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Group's name.
 * @apiParam description Group's description.
 * @apiParam image Group's image.
 * @apiParam leader Group's leader.
 * @apiParam assignments Group's assignments.
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, image, leader, assignments }),
  update)

/**
 * @api {delete} /groups/:id Delete group
 * @apiName DeleteGroup
 * @apiGroup Group
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Group not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
