const UserController = require("./app/controllers/UserController");
const ProjectController = require("./app/controllers/ProjectController");
const SectionController = require('./app/controllers/SectionController');
const CriterionController = require('./app/controllers/CriterionController');
const ProjectCriterionController = require('./app/controllers/ProjectCriterionController');

const Login = require('./app/controllers/Authenticate/Login');

const auth = require('./app/middlewares/UserAuthenticate');

module.exports = app => {

   app.post('/validateToken', Login.validateToken);
   app.post('/login', Login.signIn);

   app.route('/users')
      //   .all(auth)
      .get(UserController.Index)
      .post(UserController.store);

   app.route('/users/:id')
      .get(UserController.show)
      .put(UserController.update)
      .delete(UserController.delete);

   app.route('/projects')
      // .all(auth)
      .get(ProjectController.Index)
      .post(ProjectController.store);

   app.route('/projects/:id')
      .all(auth)
      .get(ProjectController.show)
      .put(ProjectController.update)
      .delete(ProjectController.delete);

   /** SECTION'S ROUTES **/

   app.route('/sections')
      .get(SectionController.index)
      .post(SectionController.store);

   app.route('/sections/:id')
      .get(SectionController.show)
      .put(SectionController.update)
      .delete(SectionController.delete);

   /** CRITERION'S ROUTES **/

   app.route('/criteria')
      .get(CriterionController.index)
      .post(CriterionController.store);

   app.route('/criteria/:id')
      .get(CriterionController.show)
      .put(CriterionController.update)
      .delete(CriterionController.delete)

   /** ProjectCriteria Routes */
   app.route('/prc')
      .get(ProjectCriterionController.index)

   app.route('/prc/:projectid/:criterionid/:userid')
      .post(ProjectCriterionController.store)
      .get(ProjectCriterionController.show)
      .put(ProjectCriterionController.update)
      .delete(ProjectCriterionController.delete);

   app.route('/prc/:userid')
      .get(ProjectCriterionController.indexByUser);

   app.route('/prc/:userid/:projectid')
      .get(ProjectCriterionController.showByUser);
}