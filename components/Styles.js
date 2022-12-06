import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "rgb(204, 204, 255)",
    borderBottomColor: "rgb(204, 204, 255)",
    borderTopColor: "rgb(204, 204, 255)",
  },
  textInput: {
    backgroundColor: "#ffff",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 5,
    alignItems: "center",
    borderColor: 'grey',
    borderWidth: 1, 
    marginTop: 10,
  },
  textInputInside: {
    height: 50,
    flex: 1,
    padding: 5,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    paddingRight: 100,
    fontFamily: 'sans-serif',
    color: 'black'
  },
  emptyTitle: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 20,
    marginTop: 20,
    borderColor: "rgb(204, 204, 255)",
    color: 'black'
  },
  // favorite styles..
  favButton: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 75,
    paddingBottom: 10,
    marginLeft: 10,
  },
  // Home styles...
  homeContainer: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  // ...
  author: {
    paddingLeft: 10,
    marginRight: 70,
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontSize: 15,
    color: 'grey',
  },
  bookImage: {
    paddingTop: 10,
    height: 170,
    width: 120,
    borderRadius: 10,
    marginLeft: -10,
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 120
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  // Login, sign in styles...
  signContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signTitle: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    margin: 30,
  },
  signUpBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    backgroundColor: "grey",
    height: 40,
    marginTop: 10,
  },
  signBtn: {
    width: "80%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "rgb(204, 204, 255)",
  },
  signInputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    borderBottomWidth: 1, 
  },
  signTextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: 'center'
  },
  signImage: {
    width: "55%",
    height: "35%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  // Styles for details page
  detailsContainer: {
    paddingBottom: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsTitle: {
    fontFamily: 'sans-serif',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  detailsHeader: {
    fontFamily: 'sans-serif',
    marginVertical: 20,
    fontSize: 20,
    marginRight: -10,
  },
  detailsAuthor: {
    fontFamily: 'sans-serif',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  },
  detailsDescription: {
    fontFamily: 'sans-serif',
    alignItems: 'center',
    paddingHorizontal: 20,
    lineHeight: 21
  },
  detailsBookImage: {
    flex: 1,
    marginVertical: 8,
    height: 250,
    width: 170,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default styles;