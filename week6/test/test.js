const { expect } = require('chai');
const request = require('request');
const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://soorajwork6:95emFFiHs6NXM5yO@cluster0.fmllqjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const Calculation = mongoose.model('Calculation', new mongoose.Schema({
    n1: Number,
    n2: Number,
    result: Number
}));

const apiBaseUrl = 'http://localhost:3040';

describe('API and Database Tests', function() {
    before(async function() {
        try {
            await mongoose.connect(mongoUri);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB', error);
            throw error;
        }
    });

    after(async function() {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB', error);
        }
    });

    describe('', function() {
        const url = `${apiBaseUrl}/addTwoNumber?n1=3&n2=6`;
        

        it('returns status 200 to check if the API works', function(done) {
            request(url, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('returns statusCode key in body to check if API gives the right result ', function(done) {
            request(url, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                body = JSON.parse(body);
                expect(body.statuscode).to.equal(200);
                done();
            });
        });

        it('returns the result as a number', function(done) {
            request(url, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                body = JSON.parse(body);
                expect(body.data).to.be.a('number');
                done();
            });
        });

        it('returns the result equal to 9', function(done) {
            request(url, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                body = JSON.parse(body);
                expect(body.data).to.equal(9);
                done();
            });
        });

        it('returns the result not equal to 15', function(done) {
            request(url, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                body = JSON.parse(body);
                expect(body.data).to.not.equal(15);
                done();
            });
        });

        it('handles requests with no parameters', function(done) {
            request(`${apiBaseUrl}/addTwoNumber`, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it('handles requests with missing parameters', function(done) {
            request(`${apiBaseUrl}/addTwoNumber?n1=5`, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it('handles large numbers', function(done) {
            const largeUrl = `${apiBaseUrl}/addTwoNumber?n1=1000000&n2=2000000`;
            request(largeUrl, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                body = JSON.parse(body);
                expect(body.data).to.equal(3000000);
                done();
            });
        });

        it('handles zero values', function(done) {
            const zeroUrl = `${apiBaseUrl}/addTwoNumber?n1=0&n2=0`;
            request(zeroUrl, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                body = JSON.parse(body);
                expect(body.data).to.equal(0);
                done();
            });
        });
        const historyUrl = `${apiBaseUrl}/history`;

        it('should retrieve calculation history', function(done) {
            request(historyUrl, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                expect(response.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body).to.be.an('array');
                done();
            });
        });

        it('should return a valid response for an unknown endpoint', function(done) {
            request(`${apiBaseUrl}/unknownEndpoint`, function(error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                expect(response.statusCode).to.equal(404); 
                done();
            });
        });

        it('should save a calculation to the database', async function() {
            const calculation = new Calculation({ n1: 5, n2: 10, result: 15 });
            const savedCalculation = await calculation.save();
            expect(savedCalculation._id).to.be.an('object');
            expect(savedCalculation.n1).to.equal(5);
            expect(savedCalculation.n2).to.equal(10);
            expect(savedCalculation.result).to.equal(15);
        });

        it('should retrieve a saved calculation from the database', async function() {
            const calculation = new Calculation({ n1: 3, n2: 7, result: 10 });
            await calculation.save();

            const retrievedCalculation = await Calculation.findOne({ n1: 3, n2: 7 });
            expect(retrievedCalculation).to.not.be.null;
            expect(retrievedCalculation.result).to.equal(10);
        });

        it('should delete a calculation from the database', async function() {
            const calculation = new Calculation({ n1: 8, n2: 12, result: 20 });
            const savedCalculation = await calculation.save();

            await Calculation.deleteOne({ _id: savedCalculation._id });
            const deletedCalculation = await Calculation.findById(savedCalculation._id);
            expect(deletedCalculation).to.be.null;
        });
    });

    

    });

    