import { expect } from 'chai'
import sinon from 'sinon'
import HTTPTransport from './HTTPTransport'

describe('HTTPTransport', () => {
    describe('get method', () => {
        it('should call request method with correct URL and method', () => {
            const transport = new HTTPTransport('/test-endpoint')
            const requestStub = sinon.stub(transport, 'request' as keyof HTTPTransport)

            transport.get('/resource')

            expect(requestStub.calledOnce).to.be.true
            expect(
                requestStub.calledWith('https://ya-praktikum.tech/api/v2/test-endpoint/resource', {
                    method: 'GET',
                })
            ).to.be.true
        })
    })

    describe('put method', () => {
        it('should call request method with correct URL and method', () => {
            const transport = new HTTPTransport('/test-endpoint')
            const requestStub = sinon.stub(transport, 'request' as keyof HTTPTransport)

            transport.put('/resource')

            expect(requestStub.calledOnce).to.be.true
            expect(
                requestStub.calledWith('https://ya-praktikum.tech/api/v2/test-endpoint/resource', {
                    method: 'PUT',
                })
            ).to.be.true
        })
    })

    describe('post method', () => {
        it('should call request method with correct URL and method', () => {
            const transport = new HTTPTransport('/test-endpoint')
            const requestStub = sinon.stub(transport, 'request' as keyof HTTPTransport)

            transport.post('/resource')

            expect(requestStub.calledOnce).to.be.true
            expect(
                requestStub.calledWith('https://ya-praktikum.tech/api/v2/test-endpoint/resource', {
                    method: 'POST',
                })
            ).to.be.true
        })
    })

    describe('delete method', () => {
        it('should call request method with correct URL and method', () => {
            const transport = new HTTPTransport('/test-endpoint')
            const requestStub = sinon.stub(transport, 'request' as keyof HTTPTransport)

            transport.delete('/resource')

            expect(requestStub.calledOnce).to.be.true
            expect(
                requestStub.calledWith('https://ya-praktikum.tech/api/v2/test-endpoint/resource', {
                    method: 'DELETE',
                })
            ).to.be.true
        })
    })
})
