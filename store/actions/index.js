// MODULE IMPORTS
import Axios from "axios";
import { useSelector } from "react-redux";
// FILE IMPORTS
import {
  DISPLAY_ALL_PROMOS,
  DISPLAY_USER,
  DISPLAY_SUBSCRIPTIONS,
  STATUS_LIMIT
} from "../constants";
import { get, set, purge } from "../../cache/functions";

export const setPromos = promos => ({
  type: DISPLAY_ALL_PROMOS,
  promos
});

export const setUser = user => ({
  type: DISPLAY_USER,
  user
});

export const setSubscriptions = subscriptions => ({
  type: DISPLAY_SUBSCRIPTIONS,
  subscriptions
});

export const setStatusLimit = (status, interval) => ({
  type: STATUS_LIMIT,
  status,
  interval
});

export const fetchNewPromos = () => async dispatch => {
  const promos = await get("newest_promos");
  if (promos) {
    dispatch(setPromos(promos));
  } else {
    try {
      dispatch(setStatusLimit(80));
      const { data: promosData } = await Axios.get(
        "https://promo-aggregator.crowfx.online/promos"
      );
      set("newest_promos", promosData);
      dispatch(setPromos(promosData));
      dispatch(setStatusLimit(100));
    } catch (e) {
      Promise.reject(e);
    }
  }
};

const appendNewPromos = (data, offset) => async dispatch => {
  try {
    dispatch(setStatusLimit(80));
    const { data: promosData } = await Axios.get(
      `https://promo-aggregator.crowfx.online/promos?offset=${offset}`
    );
    set("newest_promos", [...data, ...promosData]);
    dispatch(setPromos([...data, ...promosData]));
    dispatch(setStatusLimit(100));
  } catch (e) {
    Promise.reject(e);
  }
};

export const refresh = (prevData, offset) => async dispatch => {
  await purge("newest_promos");
  prevData && offset
    ? await dispatch(appendNewPromos(prevData, offset))
    : await dispatch(fetchNewPromos());
};

export const register = token => async dispatch => {
  try {
    const { data: user } = await Axios({
      method: "post",
      url: "https://promo-aggregator.crowfx.online/users/register",
      data: {
        device_token: token
      }
    });
    dispatch(setUser(user));
  } catch (e) {
    Promise.reject(e);
  }
};

export const login = token => async dispatch => {
  try {
    const { data: user } = await Axios({
      method: "post",
      url: "https://promo-aggregator.crowfx.online/users/login",
      data: {
        device_token: token
      }
    });
    dispatch(setUser(user));
  } catch {
    await dispatch(register(token));
  }
};

export const subscribed = token => async dispatch => {
  dispatch(setStatusLimit(80));
  const [
    { data: userSubscriptions },
    { data: newSubscriptions }
  ] = await Promise.all([
    Axios({
      method: "get",
      url: "https://promo-aggregator.crowfx.online/promos/subscribed",
      headers: {
        device_token: token
      }
    }),
    Axios({
      method: "get",
      url: "https://promo-aggregator.crowfx.online/promos/new-promos",
      headers: {
        device_token: token
      }
    })
  ]);
  dispatch(setStatusLimit(100));
  dispatch(setSubscriptions([...newSubscriptions, ...userSubscriptions]));
};

export const extendedSubscribed = (
  token,
  offset,
  prevData
) => async dispatch => {
  const { data } = await Axios({
    method: "get",
    url: `https://promo-aggregator.crowfx.online/promos/subscribed?offset=${offset}`,
    headers: {
      device_token: token
    }
  });
  dispatch(setSubscriptions([...prevData, ...data]));
};
