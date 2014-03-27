'use strict'

exports.render = (req, res) ->
	if req.url isnt '/admin'
		req.url='/admin'
	res.render('admin/default')