import Ember from 'ember';
import JobLogModel from '../../../../models/job-log';


export default Ember.Route.extend({
    model(params) {
        //wyong, 20170328
        console.log("route/projects/project/job/job-detail.js, params.job_id = " , params.job_id );
        var project_id = this.modelFor("projects.project").id;
        var spider_id = '';

        var model = this.modelFor('projects.project.jobs');
        /*
        model.forEach(function(job) {            
            if (job['id'] === params.job_id  ) {
                spider_id = job['spider'];
            }
        });
        */

        //wyong, 20170413
        var types = ['pending', 'running', 'finished'];
        types.forEach(function(type) {
            $.each(model[type], function(key, job ) {
                if (job['id'] === params.job_id  ) {
                    spider_id = job['spider'];
                }
            });
        });

        //wyong, 20170906
        //var jobLogModel = new JobLogModel();
        var jobLogModel = this.store.createRecord('job-log');

        return jobLogModel.findAll(project_id, spider_id, params.job_id);
    },
 
    renderTemplate() {
        this.render({
            into: 'application',
            outlet: 'main'
        });
    },

});
