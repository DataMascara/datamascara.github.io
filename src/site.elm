-- Code for datamascara.com
-- Written by @katychuang

-- General Imports
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode as Encode exposing (string)
import Markdown

-- Routing Imports
import Navigation exposing (Location)
import UrlParser as Url exposing (..)

--------------------------------------------------------------------------------
-- Routing
type Route = SectionRoute | PageRoute String | NotFoundRoute

matchers : Parser (Route -> a) a
matchers =
  oneOf
      [ Url.map SectionRoute top
      , Url.map PageRoute (Url.string)
      ]

parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route

        Nothing ->
            NotFoundRoute

--------------------------------------------------------------------------------
-- Main
main : Program Flags Model Msg
main =
  Navigation.programWithFlags OnLocationChange
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

--------------------------------------------------------------------------------
-- MODEL
type alias Model =
    { route : Route
    , errorMessage : String
    }

initialModel : Flags -> Route -> Model
initialModel flags route =
    { route = route
    , errorMessage = ""
    }

type alias Cat = String

type alias Flags =
    { width : Int
    , height : Int
    }

type Msg
  = OnLocationChange Location
  | ShowCat Cat

--------------------------------------------------------------------------------
init : Flags -> Location -> ( Model , Cmd Msg )
init flags location =
    let
        currentRoute = parseLocation location
    in
        (initialModel flags currentRoute,  Cmd.none)


--------------------------------------------------------------------------------
-- UPDATE

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of

    OnLocationChange location ->
        let newRoute = parseLocation location
          in ( { model | route = newRoute }, Cmd.none )

    ShowCat cat ->
      ( model, Navigation.newUrl ("#cat/" ++ cat) )

--------------------------------------------------------------------------------
-- VIEW

view : Model -> Html Msg
view model =
    div [id "outer"]
        [ metaMenu
        , page model
        , footerMenu]

home : Html Msg
home =
    div [ class "back home" ]
        [ p [ class "h6" ]
            [ a [ href "/"]
                [ text " back to gallery" ]
        ] ]

siteLinks : List { url : String, title : String}
siteLinks = [ {url = "#mining", title = "Mining"}
            , {url = "#algorithms", title = "Algorithms"}
            , {url = "#science", title = "Science"}
            , {url = "#curation", title = "Curation"}
            , {url = "#analytics", title = "Realtime-Analytics"}
            ]

metaMenu : Html Msg
metaMenu =
    div [ class "wrapper"]
        [ header [ id "header" ]
          [ div [ class "inside"]
                [ h2 [ class "name" ]
                    [ a [ href "/"
                        , class "home" ] [ text "Data MASCARA" ] ]
                , div [ class "links" ] [ text " " ]
                , br [] []
                , div [ id "topics", class "acronym" ] [ ul [ ] (List.map (\s -> li [] [ a [href s.url ] [text s.title]]) siteLinks )] ]
        ]]

footerMenu : Html Msg
footerMenu =
    let
        year = "2020"
    in
    footer [ id "footer" ] [
        div [class "inside container"] [ div [class "widget"][
            p [ class "h6 mb0" ] [
                 span [ property "innerHTML" (Encode.string "&copy;") ] []
               , text "2012-2020 Dr Katherine Chuang. All rights reserved."
               , br [] []
               , text "Site designed and coded by Dr Kat with Elm."
              ]
            ]]]


notFoundView : Html msg
notFoundView =
    div [] [ text "Not found" ]

page : Model -> Html Msg
page model =
    case model.route of
        SectionRoute -> loadPage model "Welcome"

        PageRoute cat ->
            case cat of
                "sample" -> samplePage
                "credits" -> creditPage
                _ -> loadPage model cat

        NotFoundRoute ->
            notFoundView

loadPage : Model -> String -> Html Msg
loadPage model cat =
    div [ id "primary" ] [
          div [ class "col first" ] [ div [ id "description" ] [ ] ]
        , div [ class "col" ] [ div [ class "figure", id "rightMain" ] [ ] ]
    ]


samplePage : Html Msg
samplePage =
    div [id "primary"] [
         div [ class "col" ][
              div [ class "article" ] [
                   Markdown.toHtml [ class "content"] """
# Data Structures

## Intro
1. Why do we study Data Structures?
2. What are Data Structures?
3. What are Algorithms?

## Data Structures

### 1. Arrays

* solves the problem of storing a large number of values and manipulating them
* is a data structure designed to store a fixed-size sequential collection of elements of
the same type, i.e., it is a collection of variables of the same type

### 2. Stacks
* in this kind of structure, items are push in a first in, last out manner.
"""
        ] ]
       ]


creditPage : Html Msg
creditPage =
    div [id "primary"] [
         div [ class "col" ][
              div [ class "article" ] [
                   Markdown.toHtml [ class "content"] """
# About Data Mascara

This is an initiative to encourage cultural diversity amongst a community of practitioners n data science.

## About this site

This website is created with Elm and hosted on GitHub Pages [here](https://github.com/DataMascara/datamascara.github.io). Any issues may be submitted to the [issue tracker](https://github.com/DataMascara/datamascara.github.io/issues).

## About the author

I am a lecturer of the Department of Computer & Information Science at Brooklyn College of CUNY

Find me on twitter! [@katychuang](http://twitter.com/katychuang)
"""
              ]
         ]
         , div [class "col second"] [
             div [id "secondary"][
                text "text"
             ]
   ]
    ]

--------------------------------------------------------------------------------

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
