import React from "react"
import { Theme, GridList, GridListTile } from "@material-ui/core"
import { createStyles } from "@material-ui/styles"
import { component } from "blocks"
import { SuggestionCard } from "custom"
import { Card } from "blocks"

const styles = (theme: Theme) =>
    createStyles({
        gridList: {
            minHeight: theme.spacing(90),
            minWidth: theme.spacing(180),
            padding: theme.spacing(2)
        }
    })

export type SuggestionData = {
    name: string
    type: string
    description?: string
}

export type SuggestionResultsGridProps = {
    suggestions: SuggestionData[]
}

export const SuggestionResultsGrid = component({
    name: "SuggestionResultsGrid",
    defaultProps: {} as Partial<SuggestionResultsGridProps>,
    styles,
    query: { cardFilter: null }
})(({ classes, suggestions, data: { cardFilter } }) => {
    const suggestionCards = suggestions
        .filter(({ name, description }) =>
            name
                .concat(description ? description : "")
                .toLowerCase()
                .includes(cardFilter!.toLowerCase())
        )
        .map(({ name, type, description }) => (
            <GridListTile key={name}>
                <SuggestionCard {...{ name, type, description }} />
            </GridListTile>
        ))
    return (
        <Card>
            <GridList className={classes.gridList} cols={4}>
                {suggestionCards}
            </GridList>
        </Card>
    )
})
