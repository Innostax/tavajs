//jshint esversion:6

const express = require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { selectionRoute } = require('./routes')
const { Kafka } = require('kafkajs')


  
const port = process.env.PORT

const app = express();

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092'],
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
	// Producing
	await producer.connect()
	await producer.send({
		topic: 'test-topic',
		messages: [{ value: 'Hello KafkaJS user!' }],
	})

	// Consuming
	await consumer.connect()
	await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				partition,
				offset: message.offset,
				value: message.value.toString(),
			})
		},
	})
}




app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.get(selectionRoute(app))
app.listen(port, function() {
  
  
  console.log(`Server started on port ${port}`);
});

module.exports = app;