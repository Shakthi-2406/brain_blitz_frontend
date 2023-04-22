stompClient.send('/app/myEndpoint', {}, JSON.stringify({"name": "John", "age": 30, "city": "New York"}));
@MessageMapping("/myEndpoint")
public void handleMessage(String message) {
    // Parse the message body as a JSON object
    JsonObject jsonObject = new JsonParser().parse(message).getAsJsonObject();
    
    // Access the values in the JSON object
    String name = jsonObject.get("name").getAsString();
    int age = jsonObject.get("age").getAsInt();
    String city = jsonObject.get("city").getAsString();
    
    // Do something with the values...
}

import com.fasterxml.jackson.databind.ObjectMapper;

// ...

private final ObjectMapper objectMapper = new ObjectMapper();

@MessageMapping("/application")
@SendTo("/all/messages")
public String sendToAll(final MyDataObject data) throws Exception {
    String json = objectMapper.writeValueAsString(data);
    return json;
}

stompClient.subscribe('/all/messages', function (message) {
    var data = JSON.parse(message.body);
    console.log(data);
  });
  














//To connect a user to the WebSocket server, you can use the STOMP protocol to establish a WebSocket connection and subscribe to a specific topic. Here's an example of how you can do this in JavaScript:

const socket = new WebSocket('ws://localhost:8080/websocket');
const stompClient = Stomp.over(socket);

// Replace `user-id` with the actual user ID
const topic = '/specific/user-id';

// Replace `access-token` with the actual access token for the user
// const headers = {
//   Authorization: 'Bearer access-token',
// };

stompClient.connect(() => {
  stompClient.subscribe(topic, (message) => {
    console.log(`Received message: ${message.body}`);
  });
});


const socket = new SockJS('http://localhost:8080/websocket');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    const userId = // user ID of the current user
    stompClient.subscribe('/all/messages', function(message) {
        console.log('Received message: ' + message.body);
    });
    stompClient.subscribe(`/specific/${userId}`, function(message) {
        console.log('Received message: ' + message.body);
    });
});

function sendToAll(message) {
    stompClient.send('/app/all', {}, message);
}

function sendToSpecific(userId, message) {
    stompClient.send(`/app/specific/${userId}`, {}, message);
}



app.post('/api/users', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  import React, { useState } from 'react';
  import axios from 'axios';
  
  const AddUserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const user = { name, email, password };
  
      try {
        const response = await axios.post('/api/users', user);
        console.log(response.data);
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    );
  };
  
  export default AddUserForm;
  
  
  
  
      public int getCurrentQuestionIndex() {
          return currentQuestionIndex;
      }
  
      public void setCurrentQuestionIndex(int currentQuestionIndex) {
          this.currentQuestionIndex = currentQuestionIndex;
      }
  
      public Question getCurrentQuestion() {
          return currentQuestionIndex >= 0 && currentQuestionIndex < numQuestions ? questions.get(currentQuestionIndex) : null;
      }
  
  private void startNewGame(Game game) {
      game.setState(GameState.IN_PROGRESS);
  
      // Send the questions to both players
      for (int i = 0; i < NUM_QUESTIONS; i++) {
          Question question = quizService.getRandomQuestion();
          String questionJson = null;
  
          try {
              questionJson = objectMapper.writeValueAsString(new QuestionResponse(i,
                      question.getText(),
                      question.getChoices()));
          } catch (JsonProcessingException e) {
              // Handle the exception
          }
  
          simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_QUESTION, questionJson);
          simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_QUESTION, questionJson);
  
          // Wait for the specified duration before sending the next question
          try {
              Thread.sleep(QUESTION_DURATION);
          } catch (InterruptedException e) {
              // Handle the exception
          }
      }
  
      // The game is over, so we need to notify both players
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_GAME_OVER, "");
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_GAME_OVER, "");
  
      // Calculate the final score
      quizService.calculateFinalScore(game);
  
      // Notify both players of the final score
      String scoreJson = null;
  
      try {
          scoreJson = objectMapper.writeValueAsString(new ScoreResponse(game.getPlayerOne().getScore(), game.getPlayerTwo().getScore()));
      } catch (JsonProcessingException e) {
          // Handle the exception
      }
  
  @RestController
  public class QuizController {
  
      private static final String DESTINATION_PREFIX = "/topic";
      private static final String DESTINATION_GAME_STARTED = "/game-started";
      private static final String DESTINATION_QUESTION = "/question";
      private static final String DESTINATION_ANSWER = "/answer";
      private static final String DESTINATION_SCORE = "/score";
      private static final String DESTINATION_GAME_OVER = "/game-over";
  
      private static final int NUM_QUESTIONS = 10;
      private static final int QUESTION_DURATION = 10000;
  
      private static final ObjectMapper objectMapper = new ObjectMapper();
  
      private final QuizService quizService;
      private final SimpMessagingTemplate simpMessagingTemplate;
      private final ScheduledExecutorService executorService;
  
      @Autowired
      public QuizController(QuizService quizService, SimpMessagingTemplate simpMessagingTemplate) {
          this.quizService = quizService;
          this.simpMessagingTemplate = simpMessagingTemplate;
          this.executorService = Executors.newSingleThreadScheduledExecutor();
      }
  
      @MessageMapping("/start-game")
      @SendToUser(DESTINATION_PREFIX + DESTINATION_GAME_STARTED)
      public GameStartedResponse startGame(@Payload StartGameRequest request, @AuthenticationPrincipal User user) {
          Game game = quizService.createGame(user, request.getOpponent());
  
          // Schedule the game to start in 5 seconds
          executorService.schedule(() -> startNewGame(game), 5, TimeUnit.SECONDS);
  
          return new GameStartedResponse(game.getId(), game.getPlayerOne().getUsername(), game.getPlayerTwo().getUsername());
      }
  
      @MessageMapping("/answer-question")
      @SendTo(DESTINATION_PREFIX + DESTINATION_ANSWER)
      public AnswerResponse answerQuestion(@Payload AnswerRequest request, @AuthenticationPrincipal User user) throws Exception {
          Game game = quizService.getGame(request.getGameId());
  
          if (game.getCurrentQuestionIndex() == request.getQuestionIndex()) {
              // The answer is correct
              quizService.incrementScore(game, user);
              return new AnswerResponse(request.getQuestionIndex(), user.getUsername(), true, game.getPlayerOne().getScore(), game.getPlayerTwo().getScore());
          } else {
              // The answer is incorrect
              User opponent = quizService.getOpponent(game, user);
              quizService.incrementScore(game, opponent);
              return new AnswerResponse(request.getQuestionIndex(), opponent.getUsername(), false, game.getPlayerOne().getScore(), game.getPlayerTwo().getScore());
          }
      }
  
      @MessageMapping("/game-over")
      public void gameOver(@Payload GameOverRequest request, @AuthenticationPrincipal User user) throws Exception {
          Game game = quizService.getGame(request.getGameId());
  
          if (game.getState() == GameState.IN_PROGRESS) {
              // The game ended prematurely, so we need to calculate the final score
              quizService.calculateFinalScore(game);
          }
  
          // Notify both players of the final score
          String scoreJson = objectMapper.writeValueAsString(new ScoreResponse(game.getPlayerOne().getScore(), game.getPlayerTwo().getScore()));
          simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
          simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
      }
  
      private void startNewGame(Game game) {
          game.setState(GameState.IN_PROGRESS);
  
          // Send the questions to both players
          for (int i = 0; i < NUM_QUESTIONS; i++) {
              Question question = quizService.getRandomQuestion();
              String questionJson = null;
  
              try {
                  questionJson = objectMapper.writeValueAsString(new QuestionResponse(i
  
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
  }
      
  
  
  private void startNewGame(Game game) {
      game.setState(GameState.IN_PROGRESS);
  
      // Send the questions to both players
      for (int i = 0; i < NUM_QUESTIONS; i++) {
          Question question = quizService.getRandomQuestion();
          String questionJson = null;
  
          try {
              questionJson = objectMapper.writeValueAsString(new QuestionResponse(i,
                      question.getText(),
                      question.getChoices()));
          } catch (JsonProcessingException e) {
              // Handle the exception
          }
  
          simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_QUESTION, questionJson);
          simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_QUESTION, questionJson);
  
          // Wait for the specified duration before sending the next question
          try {
              Thread.sleep(QUESTION_DURATION);
          } catch (InterruptedException e) {
              // Handle the exception
          }
      }
  
      // The game is over, so we need to notify both players
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_GAME_OVER, "");
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_GAME_OVER, "");
  
      // Calculate the final score
      quizService.calculateFinalScore(game);
  
      // Notify both players of the final score
      String scoreJson = null;
  
      try {
          scoreJson = objectMapper.writeValueAsString(new ScoreResponse(game.getPlayerOne().getScore(), game.getPlayerTwo().getScore()));
      } catch (JsonProcessingException e) {
          // Handle the exception
      }
  
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
      simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
  }
  
  /**
   * Processes the answer submitted by a player.
   */
  @MessageMapping("/quiz/answer")
  public void processAnswer(@Payload AnswerRequest answerRequest, Principal principal) {
      String username = principal.getName();
      Game game = gameService.getGameByPlayerUsername(username);
  
      if (game == null || game.getState() != GameState.IN_PROGRESS) {
          // The player is not in a game or the game is not in progress, so we ignore the answer
          return;
      }
  
      Player player = game.getPlayerByUsername(username);
  
      if (player.getAnswer() == null) {
          // The player has not yet submitted an answer for the current question, so we process their answer
          player.setAnswer(answerRequest.getChoice());
  
          // Notify the other player of the answer
          AnswerResponse answerResponse = new AnswerResponse(username, answerRequest.getChoice());
          String answerJson = null;
  
          try {
              answerJson = objectMapper.writeValueAsString(answerResponse);
          } catch (JsonProcessingException e) {
              // Handle the exception
          }
  
          simpMessagingTemplate.convertAndSendToUser(game.getOtherPlayerUsername(username), DESTINATION_PREFIX + DESTINATION_OTHER_ANSWER, answerJson);
  
          // Check if both players have submitted their answers for the current question
          if (game.getPlayerOne().getAnswer() != null && game.getPlayerTwo().getAnswer() != null) {
              // Both players have submitted their answers, so we calculate the scores for the current question
              quizService.calculateQuestionScore(game);
  
              // Notify both players of the scores for the current question
              String scoreJson = null;
  
              try {
                  scoreJson = objectMapper.writeValueAsString(new ScoreResponse(game.getPlayerOne().getScore(), game.getPlayerTwo().getScore()));
              } catch (JsonProcessingException e) {
                  // Handle the exception
              }
  
              simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
              simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
  
              // Move to the next question
              game.moveToNextQuestion();
  
              if (game.getCurrentQuestion() == null) {
                  // There are no more questions, so the game is over
                  game.setState(GameState.GAME_OVER);
  
                  // Notify both players of the final score
                  scoreJson = null;
  
                  try {
                      scoreJson = objectMapper.writeValueAsString(new ScoreResponse(game.getPlayerOne().getScore(), game.getPlayerTwo().getScore()));
                  } catch (JsonProcessingException e) {
                      // Handle the exception
                  }
  
                  simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
                  simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
  
                  // Update the user statistics
                  quizService.updateUserStatistics(game.getPlayerOne());
                  quizService.updateUserStatistics(game.getPlayerTwo());
  
                  // Remove the game from the game service
                  gameService.removeGame(game);
              } else {
                  // Send the next question to both players
                  Question question = game.getCurrentQuestion();
                  String questionJson = null;
  
                  try {
                      questionJson = objectMapper.writeValueAsString(new QuestionResponse(game.getCurrentQuestionIndex(),
                              question.getText(),
                              question.getChoices()));
                  } catch (JsonProcessingException e) {
                      // Handle the exception
                  }
  
                  simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_QUESTION, questionJson);
                  simpMessagingTemplate.convertAndSendToUser(game.getPlayerTwo().get
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  @RestController
  public class QuizController {
  
      private static final String DESTINATION_PREFIX = "/topic";
      private static final String DESTINATION_GAME_STARTED = "/game-started";
      private static final String DESTINATION_QUESTION = "/question";
      private static final String DESTINATION_ANSWER = "/answer";
      private static final String DESTINATION_SCORE = "/score";
      private static final String DESTINATION_GAME_OVER = "/game-over";
  
      private static final int NUM_QUESTIONS = 10;
      private static final int QUESTION_DURATION = 10000;
  
      private static final ObjectMapper objectMapper = new ObjectMapper();
  
      private final QuizService quizService;
  
      @Autowired
      public QuizController(QuizService quizService) {
          this.quizService = quizService;
      }
  
      @MessageMapping("/start-game")
      @SendToUser(DESTINATION_PREFIX + DESTINATION_GAME_STARTED)
      public GameStartedResponse startGame(@Payload StartGameRequest request, @AuthenticationPrincipal User user) {
          Game game = quizService.createGame(user, request.getOpponent());
          return new GameStartedResponse(game.getId(), game.getPlayerOne().getUsername(), game.getPlayerTwo().getUsername());
      }
  
      @MessageMapping("/answer-question")
      @SendTo(DESTINATION_PREFIX + DESTINATION_ANSWER)
      public AnswerResponse answerQuestion(@Payload AnswerRequest request, @AuthenticationPrincipal User user) throws Exception {
          Game game = quizService.getGame(request.getGameId());
  
          if (game.getCurrentQuestionIndex() == request.getQuestionIndex()) {
              // The answer is correct
              quizService.incrementScore(game, user);
              return new AnswerResponse(request.getQuestionIndex(), user.getUsername(), true, game.getPlayerOne().getScore(), game.getPlayerTwo().getScore());
          } else {
              // The answer is incorrect
              User opponent = quizService.getOpponent(game, user);
              quizService.incrementScore(game, opponent);
              return new AnswerResponse(request.getQuestionIndex(), opponent.getUsername(), false, game.getPlayerOne().getScore(), game.getPlayerTwo().getScore());
          }
      }
  
      @MessageMapping("/game-over")
      public void gameOver(@Payload GameOverRequest request, @AuthenticationPrincipal User user) throws Exception {
          Game game = quizService.getGame(request.getGameId());
  
          if (game.getState() == GameState.IN_PROGRESS) {
              // The game ended prematurely, so we need to calculate the final score
              quizService.calculateFinalScore(game);
          }
  
          // Notify both players of the final score
          String scoreJson = objectMapper.writeValueAsString(new ScoreResponse(game.getPlayerOne().getScore(), game.getPlayerTwo().getScore()));
          simpMessagingTemplate.convertAndSendToUser(game.getPlayerOne().getUsername(), DESTINATION_PREFIX + DESTINATION_SCORE, scoreJson);
          simpMessagingTemplate
  
  
  
  
  
  @Configuration
  @EnableWebSocketMessageBroker
  public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  
      @Override
      public void configureMessageBroker(MessageBrokerRegistry config) {
          config.enableSimpleBroker("/topic");
          config.setApplicationDestinationPrefixes("/app");
      }
  
      @Override
      public void registerStompEndpoints(StompEndpointRegistry registry) {
          registry.addEndpoint("/quiz-competition").setAllowedOrigins("*").withSockJS();
      }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  import React, { useState, useEffect } from 'react';
  import { w3cwebsocket as WebSocket } from 'websocket';
  
  const client = new WebSocket('ws://localhost:8080/quiz');
  
  function Quiz() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    
    useEffect(() => {
      // Handle incoming messages from the server
      client.onmessage = function(event) {
        setQuestion(event.data);
      };
    }, []);
    
    function handleAnswer() {
      // Send the user's answer to the server
      client.send(answer);
      setAnswer('');
    }
    
    return (
      <div>
        <h1>Quiz</h1>
        <p>{question}</p>
        <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
        <button onClick={handleAnswer}>Submit</button>
      </div>
    );
  }
  
  export default Quiz;
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  import java.util.Collections;
  import java.util.HashSet;
  import java.util.Set;
  
  import javax.websocket.OnClose;
  import javax.websocket.OnError;
  import javax.websocket.OnMessage;
  import javax.websocket.OnOpen;
  import javax.websocket.Session;
  import javax.websocket.server.ServerEndpoint;
  
  import org.springframework.stereotype.Component;
  
  @Component
  @ServerEndpoint("/quiz")
  public class QuizEndpoint {
      
      // Set of all connected sessions
      private static Set<Session> sessions = Collections.synchronizedSet(new HashSet<>());
      
      // Handle incoming connections
      @OnOpen
      public void onOpen(Session session) {
          sessions.add(session);
      }
      
      // Handle incoming messages
      @OnMessage
      public void onMessage(String message, Session session) {
          // Broadcast the message to all connected clients
          sessions.forEach(s -> {
              try {
                  s.getBasicRemote().sendText(message);
              } catch (Exception e) {
                  e.printStackTrace();
              }
          });
      }
      
      // Handle disconnections
      @OnClose
      public void onClose(Session session) {
          sessions.remove(session);
      }
      
      // Handle errors
      @OnError
      public void onError(Session session, Throwable error) {
          error.printStackTrace();
      }
      
  }
  
  
  
  
  
  
  
  
  
  
  
  import java.util.Map;
  import java.util.concurrent.ConcurrentHashMap;
  import javax.websocket.server.PathParam;
  import javax.websocket.*;
  import javax.websocket.server.ServerEndpoint;
  
  @ServerEndpoint(value = "/quiz/{userId}")
  public class QuizEndpoint {
  
      private static Map<String, Session> sessions = new ConcurrentHashMap<>();
      private static Map<String, Integer> scores = new ConcurrentHashMap<>();
  
      @OnOpen
      public void onOpen(Session session, @PathParam("userId") String userId) {
          sessions.put(userId, session);
          scores.put(userId, 0);
      }
  
      @OnClose
      public void onClose(Session session, @PathParam("userId") String userId) {
          sessions.remove(userId);
          scores.remove(userId);
      }
  
      @OnMessage
      public void onMessage(Session session, String message, @PathParam("userId") String userId) {
          // Handle incoming quiz messages here
      }
  
      @OnError
      public void onError(Session session, Throwable throwable, @PathParam("userId") String userId) {
          // Handle errors here
      }
  
      public static void broadcast(String message) {
          sessions.values().forEach(session -> {
              try {
                  session.getBasicRemote().sendText(message);
              } catch (Exception e) {
                  e.printStackTrace();
              }
          });
      }
  
      public static void broadcastScore() {
          scores.entrySet().stream()
              .sorted(Map.Entry.comparingByValue())
              .forEach(entry -> broadcast(entry.getKey() + " : " + entry.getValue()));
      }
  }
  
  
  
  

  
  Session session = sessions.get(userId);
  if (session != null) {
      session.getBasicRemote().sendText("Hello, " + userId);
  }
  
  