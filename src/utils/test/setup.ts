import chai from "chai"
import chaiHttp from "chai-http"
import chaiThings from "chai-things"
import server from "server"

chai.use(chaiHttp)
chai.use(chaiThings)
export let httpAgent: ChaiHttp.Agent

before(async () => {
	const httpServer = await server()
	httpAgent = chai.request(httpServer.server).keepOpen()
	console.log("http agent opened")
})

after(() => {
	httpAgent.close()
	console.log("http agent closed")
})
